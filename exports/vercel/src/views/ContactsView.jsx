import React, { useMemo, useState } from 'react';
import { C, mono, btnGhost } from '../theme.js';
import { BUSINESSES } from '../data.js';

const COLS = '1.1fr 1fr 1.3fr 1.4fr 1.1fr 90px';
const MINW = 760;

function externalUrl(url) {
  return /^https?:\/\//.test(url) ? url : `https://${url}`;
}

export default function ContactsView({ savedContacts, onViewOnMap, onExport }) {
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const businessByUrl = new Map(BUSINESSES.map((b) => [b.mapsUrl, b]));
    const list = [];
    Object.entries(savedContacts || {}).forEach(([mapsUrl, contacts]) => {
      const business = businessByUrl.get(mapsUrl);
      (contacts || []).forEach((c) => list.push({ ...c, mapsUrl, businessName: business?.name || 'Unknown business' }));
    });
    return list;
  }, [savedContacts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => `${r.name} ${r.businessName}`.toLowerCase().includes(q));
  }, [rows, query]);

  const businessCount = useMemo(() => new Set(rows.map((r) => r.mapsUrl)).size, [rows]);

  return (
    <div style={{ position: 'absolute', inset: 0, background: C.surface, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 46, flexShrink: 0, borderBottom: '1px solid ' + C.line, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}>
        <div style={{ color: '#EDEDEA', fontSize: 13, fontWeight: 600 }}>Contacts</div>
        <div onClick={onExport} style={btnGhost}>Export CSV</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search saved contacts by name or company..."
          style={{ background: C.card, border: '1px solid ' + C.borderStrong, borderRadius: 10, padding: '10px 14px', color: '#EDEDEA', fontSize: 13.5, outline: 'none' }}
        />

        <div style={{ color: C.textDim, fontSize: 11, fontFamily: mono, letterSpacing: '.1em' }}>
          {rows.length} CONTACT{rows.length === 1 ? '' : 'S'} SAVED ACROSS {businessCount} COMPAN{businessCount === 1 ? 'Y' : 'IES'}
        </div>

        {filtered.length === 0 ? (
          <div style={{ color: C.textDim, fontSize: 12.5, padding: '20px 0' }}>
            {rows.length === 0
              ? 'No contacts saved yet. Find people and push them to the Map tab from Prospect, then reveal and save them there.'
              : `No saved contacts match "${query}".`}
          </div>
        ) : (
          <div style={{ border: '1px solid ' + C.border, background: C.card, borderRadius: 11, overflowX: 'auto' }}>
            <div style={{ minWidth: MINW, display: 'grid', gridTemplateColumns: COLS, background: C.cardAlt, borderBottom: '1px solid ' + C.border, padding: '10px 14px', color: C.textDim, fontSize: 10.5, fontFamily: mono, letterSpacing: '.08em' }}>
              <div>NAME</div><div>TITLE</div><div>COMPANY</div><div>EMAIL</div><div>MOBILE</div><div />
            </div>
            {filtered.map((c, i) => (
              <div key={`${c.mapsUrl}-${c.name}-${i}`} style={{ minWidth: MINW, display: 'grid', gridTemplateColumns: COLS, alignItems: 'center', padding: '11px 14px', borderTop: '1px solid ' + C.line, whiteSpace: 'nowrap' }}>
                <div style={{ color: '#EDEDEA', fontSize: 12.5, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {c.linkedinUrl ? <a href={externalUrl(c.linkedinUrl)} target="_blank" rel="noopener noreferrer" style={{ color: '#EDEDEA' }}>{c.name}</a> : c.name}
                </div>
                <div style={{ color: C.textDim, fontSize: 12.5, overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title || '—'}</div>
                <div style={{ color: C.textDim, fontSize: 12.5, overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.businessName}</div>
                <div style={{ color: c.email ? C.textBody : C.textFaint, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.email || 'not revealed'}</div>
                <div style={{ color: c.phone ? C.textBody : C.textFaint, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.phone || 'not revealed'}</div>
                <div
                  onClick={() => onViewOnMap(c.mapsUrl)}
                  style={{ justifySelf: 'end', border: '1px solid ' + C.borderStrong, color: C.textDim, borderRadius: 7, padding: '4px 9px', fontSize: 11, cursor: 'pointer' }}
                >
                  View on map
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
