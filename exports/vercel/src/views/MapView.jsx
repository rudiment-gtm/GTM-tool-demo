import React, { useEffect, useMemo, useRef } from 'react';
import L from 'leaflet';
import { C } from '../theme.js';
import { BUSINESSES } from '../data.js';

const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

const DOT_ICON = L.divIcon({
  className: '',
  html: `<div style="width:11px;height:11px;border-radius:50%;background:${C.green};border:2px solid rgba(11,11,13,.85);box-shadow:0 0 0 3px rgba(43,213,118,.22)"></div>`,
  iconSize: [11, 11],
  iconAnchor: [5, 5],
  popupAnchor: [0, -8],
});

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function popupHtml(b) {
  const ratingLine = b.rating ? `${b.rating.toFixed(1)} &#9733; &middot; ${b.reviews.toLocaleString()} reviews` : 'No rating yet';
  const links = [
    b.website && `<a href="${escapeHtml(b.website)}" target="_blank" rel="noopener noreferrer" style="color:${C.green}">Website</a>`,
    `<a href="${escapeHtml(b.mapsUrl)}" target="_blank" rel="noopener noreferrer" style="color:${C.green}">Google Maps</a>`,
  ].filter(Boolean).join('<span style="color:#5D6067;margin:0 6px">&middot;</span>');

  return `
    <div style="font-family:'JetBrains Mono',monospace;min-width:210px">
      <div style="font-size:13px;font-weight:600;color:#EDEDEA;margin-bottom:4px">${escapeHtml(b.name)}</div>
      <div style="font-size:11.5px;color:#9DA0A6;margin-bottom:6px">${escapeHtml(b.address)}</div>
      ${b.description ? `<div style="font-size:11.5px;color:#9DA0A6;margin-bottom:6px">${escapeHtml(b.description)}</div>` : ''}
      <div style="font-size:11.5px;color:#D6D5D1;margin-bottom:2px">${ratingLine}</div>
      <div style="font-size:11.5px;color:#D6D5D1;margin-bottom:8px">${escapeHtml(b.phone)}</div>
      <div style="font-size:11.5px">${links}</div>
    </div>
  `;
}

export default function MapView({ active, pinned, clearPinned, mapSearch, setMapSearch, onSync, onSurrounding, onAsk }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  // Real business pins (from a Google Maps export) replace the old static dotted screenshot.
  // Free CARTO/OSM tiles - swap for Mapbox (with a token) or a live geocoder when the backend lands.
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [40.35, -111.55],
      zoom: 9,
      zoomControl: false,
      attributionControl: true,
    });
    L.tileLayer(TILE_URL, { subdomains: 'abcd', maxZoom: 19, attribution: TILE_ATTRIBUTION }).addTo(map);

    markersRef.current = BUSINESSES.map((b) => {
      const marker = L.marker([b.lat, b.lng], { icon: DOT_ICON }).addTo(map);
      marker.bindPopup(popupHtml(b));
      marker.searchText = `${b.name} ${b.address}`.toLowerCase();
      return marker;
    });

    map.fitBounds(L.latLngBounds(BUSINESSES.map((b) => [b.lat, b.lng])), { padding: [40, 40] });
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (active) setTimeout(() => mapRef.current?.invalidateSize(), 0);
  }, [active]);

  useEffect(() => {
    const q = mapSearch.trim().toLowerCase();
    markersRef.current.forEach((marker) => {
      const el = marker.getElement();
      if (el) el.style.display = !q || marker.searchText.includes(q) ? '' : 'none';
    });
  }, [mapSearch]);

  const shownCount = useMemo(() => {
    const q = mapSearch.trim().toLowerCase();
    if (!q) return BUSINESSES.length;
    return BUSINESSES.filter((b) => `${b.name} ${b.address}`.toLowerCase().includes(q)).length;
  }, [mapSearch]);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      visibility: active ? 'visible' : 'hidden',
      pointerEvents: active ? 'auto' : 'none',
    }}>
      <div ref={containerRef} style={{ position: 'absolute', inset: 0, background: C.bg }} />
      <div style={{ position: 'absolute', inset: 0, background: pinned ? 'rgba(11,11,13,.22)' : 'transparent', transition: 'background .3s ease', pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 46, background: C.surface, borderBottom: '1px solid ' + C.line, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px' }}>
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
        <div style={{ position: 'absolute', top: 62, left: 16, background: 'rgba(15,16,18,.93)', border: '1px solid ' + C.borderStrong, borderRadius: 10, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 12, backdropFilter: 'blur(6px)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.green }} />
          <span style={{ color: '#EDEDEA', fontSize: 12.5 }}>{pinned}</span>
          <span onClick={clearPinned} style={{ color: C.textDim, fontSize: 12, cursor: 'pointer' }}>x</span>
        </div>
      )}

      <div style={{ position: 'absolute', top: 62, right: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['◈', '☰'].map((glyph) => (
          <div key={glyph} style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(15,16,18,.93)', border: '1px solid ' + C.borderStrong, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9C8C4', fontSize: 14, cursor: 'pointer' }}>{glyph}</div>
        ))}
        <div onClick={() => mapRef.current?.zoomIn()} style={{ width: 34, height: 34, borderRadius: 9, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.greenText, fontSize: 16, cursor: 'pointer' }}>+</div>
      </div>

      <div style={{ position: 'absolute', left: 16, bottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <div onClick={onSurrounding} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(15,16,18,.93)', border: '1px solid ' + C.borderStrong, borderRadius: 9, padding: '9px 13px', color: C.textBody, fontSize: 12.5, cursor: 'pointer', backdropFilter: 'blur(6px)' }}>
          &#9678; Find surrounding businesses
        </div>
        <div onClick={onAsk} style={{ background: 'rgba(15,16,18,.93)', border: '1px solid ' + C.borderStrong, borderRadius: 9, padding: '9px 13px', color: C.textBody, fontSize: 12.5, cursor: 'pointer', backdropFilter: 'blur(6px)' }}>
          Ask about these accounts
        </div>
      </div>
    </div>
  );
}
