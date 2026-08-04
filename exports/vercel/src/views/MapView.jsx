import React, { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import { C } from '../theme.js';
import { BUSINESSES } from '../data.js';
import { findContacts } from '../services/leadmagic.js';
import BusinessPanel from '../components/BusinessPanel.jsx';

// Standard OSM raster tiles - free, no key, reliable at real-world traffic.
// Swap for Mapbox (with a token) if this needs OSM's higher-volume usage terms later.
const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// The icon's hit area (28px) is bigger than the visible dot (14px) so it's easy to
// hit precisely on a trackpad/touchscreen without needing to land exactly on the pixel.
const DOT_ICON = L.divIcon({
  className: '',
  html: `<div style="width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer"><div style="width:14px;height:14px;border-radius:50%;background:${C.green};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.5)"></div></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

// Many businesses in this dataset sit only a few pixels apart at the default zoom
// (several per small town), which made individual dots overlap and hard to click
// reliably. Clustering groups them until zoomed in enough to tell them apart.
function clusterIcon(cluster) {
  const count = cluster.getChildCount();
  const size = count < 10 ? 32 : count < 30 ? 40 : 48;
  return L.divIcon({
    className: 'business-cluster-icon',
    html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${C.green};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;color:${C.greenText};font-weight:700;font-size:12.5px;font-family:'JetBrains Mono',monospace">${count}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function MapView({ active, pinned, clearPinned, mapSearch, setMapSearch, onSync, onSurrounding, onAsk }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const clusterRef = useRef(null);
  const allMarkersRef = useRef([]);
  const [selected, setSelected] = useState(null);
  const [contactState, setContactState] = useState({}); // mapsUrl -> { loading, contact, error, notConfigured, searched }

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [40.35, -111.55],
      zoom: 9,
      zoomControl: false,
      attributionControl: true,
    });
    L.tileLayer(TILE_URL, { subdomains: 'abc', maxZoom: 19, attribution: TILE_ATTRIBUTION }).addTo(map);

    const cluster = L.markerClusterGroup({ maxClusterRadius: 50, iconCreateFunction: clusterIcon });

    allMarkersRef.current = BUSINESSES.map((b) => {
      const marker = L.marker([b.lat, b.lng], { icon: DOT_ICON, keyboard: false });
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        setSelected(b);
      });
      marker.searchText = `${b.name} ${b.address}`.toLowerCase();
      return marker;
    });
    cluster.addLayers(allMarkersRef.current);
    map.addLayer(cluster);
    clusterRef.current = cluster;

    map.fitBounds(L.latLngBounds(BUSINESSES.map((b) => [b.lat, b.lng])), { padding: [40, 40] });
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      clusterRef.current = null;
      allMarkersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (active) setTimeout(() => mapRef.current?.invalidateSize(), 0);
  }, [active]);

  useEffect(() => {
    const cluster = clusterRef.current;
    if (!cluster) return;
    const q = mapSearch.trim().toLowerCase();
    cluster.clearLayers();
    cluster.addLayers(!q ? allMarkersRef.current : allMarkersRef.current.filter((m) => m.searchText.includes(q)));
  }, [mapSearch]);

  const shownCount = useMemo(() => {
    const q = mapSearch.trim().toLowerCase();
    if (!q) return BUSINESSES.length;
    return BUSINESSES.filter((b) => `${b.name} ${b.address}`.toLowerCase().includes(q)).length;
  }, [mapSearch]);

  const handleFindContacts = async (business) => {
    const key = business.mapsUrl;
    setContactState((s) => ({ ...s, [key]: { loading: true } }));
    try {
      const data = await findContacts(business);
      setContactState((s) => ({
        ...s,
        [key]: { loading: false, searched: true, notConfigured: !!data.notConfigured, contact: data.contacts?.[0] || null },
      }));
    } catch {
      setContactState((s) => ({ ...s, [key]: { loading: false, error: true } }));
    }
  };

  return (
    <div style={{
      position: 'absolute', inset: 0,
      visibility: active ? 'visible' : 'hidden',
      pointerEvents: active ? 'auto' : 'none',
    }}>
      <div ref={containerRef} style={{ position: 'absolute', inset: 0, background: C.bg, zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: pinned ? 'rgba(11,11,13,.22)' : 'transparent', transition: 'background .3s ease', pointerEvents: 'none', zIndex: 1 }} />

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 46, background: C.surface, borderBottom: '1px solid ' + C.line, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', zIndex: 5 }}>
        <div style={{ flex: 1, maxWidth: 380, display: 'flex', alignItems: 'center', gap: 8, background: C.card, border: '1px solid ' + C.border, borderRadius: 8, padding: '6px 11px' }}>
          <span style={{ color: C.textMute, fontSize: 12 }}>&#8981;</span>
          <input
            value={mapSearch}
            onChange={(e) => setMapSearch(e.target.value)}
            placeholder="Search businesses..."
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#EDEDEA', fontSize: 12.5 }}
          />
        </div>
        <div style={{ color: C.textDim, fontSize: 12 }}>{shownCount.toLocaleString()} shown</div>
        <div style={{ flex: 1 }} />
        <div onClick={onSync} style={{ display: 'flex', alignItems: 'center', gap: 7, background: C.card, border: '1px solid ' + C.border, borderRadius: 8, padding: '6px 11px', color: C.textBody, fontSize: 12, cursor: 'pointer' }}>
          &#8635; Sync from Clay
        </div>
        <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#1F6F45', color: '#DFF7E8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600 }}>RC</div>
      </div>

      {pinned && (
        <div style={{ position: 'absolute', top: 62, left: 16, background: 'rgba(15,16,18,.93)', border: '1px solid ' + C.borderStrong, borderRadius: 10, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 12, backdropFilter: 'blur(6px)', zIndex: 5 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.green }} />
          <span style={{ color: '#EDEDEA', fontSize: 12.5 }}>{pinned}</span>
          <span onClick={clearPinned} style={{ color: C.textDim, fontSize: 12, cursor: 'pointer' }}>x</span>
        </div>
      )}

      <div style={{ position: 'absolute', top: 62, right: 16, display: 'flex', flexDirection: 'column', gap: 8, zIndex: 5 }}>
        {['◈', '☰'].map((glyph) => (
          <div key={glyph} style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(15,16,18,.93)', border: '1px solid ' + C.borderStrong, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9C8C4', fontSize: 14, cursor: 'pointer' }}>{glyph}</div>
        ))}
        <div onClick={() => mapRef.current?.zoomIn()} style={{ width: 34, height: 34, borderRadius: 9, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.greenText, fontSize: 16, cursor: 'pointer' }}>+</div>
      </div>

      <div style={{ position: 'absolute', left: 16, bottom: 16, display: 'flex', alignItems: 'center', gap: 8, zIndex: 5 }}>
        <div onClick={onSurrounding} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(15,16,18,.93)', border: '1px solid ' + C.borderStrong, borderRadius: 9, padding: '9px 13px', color: C.textBody, fontSize: 12.5, cursor: 'pointer', backdropFilter: 'blur(6px)' }}>
          &#9678; Find surrounding businesses
        </div>
        <div onClick={onAsk} style={{ background: 'rgba(15,16,18,.93)', border: '1px solid ' + C.borderStrong, borderRadius: 9, padding: '9px 13px', color: C.textBody, fontSize: 12.5, cursor: 'pointer', backdropFilter: 'blur(6px)' }}>
          Ask about these accounts
        </div>
      </div>

      <BusinessPanel
        business={selected}
        contactState={selected ? contactState[selected.mapsUrl] : null}
        onFindContacts={handleFindContacts}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
