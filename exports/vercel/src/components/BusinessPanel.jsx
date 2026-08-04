import React from 'react';
import { C, label } from '../theme.js';

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('');
}

const row = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid ' + C.border };
const rowLabel = { color: C.textDim, fontSize: 12 };
const rowValue = { color: '#EDEDEA', fontSize: 12.5, textAlign: 'right', maxWidth: 220 };

export default function BusinessPanel({ business, contactState, onFindContacts, onClose }) {
  if (!business) return null;
  const b = business;
  const state = contactState || {};
  const contact = state.contact;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}`;

  return (
    <div style={{
      position: 'absolute', top: 0, right: 0, bottom: 0, width: 340, zIndex: 10,
      background: 'rgba(15,16,18,.97)', borderLeft: '1px solid ' + C.borderStrong,
      backdropFilter: 'blur(6px)', overflowY: 'auto', padding: 18,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ color: '#F6F5F2', fontSize: 15, fontWeight: 600, paddingRight: 12 }}>{b.name}</div>
        <span onClick={onClose} style={{ color: C.textDim, fontSize: 14, cursor: 'pointer', lineHeight: 1 }}>&#10005;</span>
      </div>
      {b.description && <div style={{ color: C.textDim, fontSize: 11.5, marginBottom: 10 }}>{b.description}</div>}

      <div style={row}>
        <span style={rowLabel}>Rating</span>
        <span style={rowValue}>{b.rating ? `${b.rating.toFixed(1)} ★ (${b.reviews.toLocaleString()})` : 'No rating yet'}</span>
      </div>
      <div style={row}>
        <span style={rowLabel}>Phone</span>
        <span style={rowValue}>{b.phone || '—'}</span>
      </div>
      <div style={row}>
        <span style={rowLabel}>Website</span>
        <span style={rowValue}>
          {b.website ? <a href={b.website} target="_blank" rel="noopener noreferrer" style={{ color: C.green }}>{b.website.replace(/^https?:\/\//, '')}</a> : '—'}
        </span>
      </div>
      <div style={{ ...row, borderBottom: 'none', alignItems: 'flex-start' }}>
        <span style={rowLabel}>Address</span>
        <span style={rowValue}>{b.address}</span>
      </div>

      <div style={{ ...label, margin: '18px 0 10px' }}>MAIN CONTACT</div>

      {contact ? (
        <div style={{ background: C.card, border: '1px solid ' + C.borderStrong, borderRadius: 10, padding: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1F6F45', color: '#DFF7E8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>
              {initials(contact.name || '?')}
            </div>
            <div>
              <div style={{ color: '#EDEDEA', fontSize: 12.5, fontWeight: 600 }}>{contact.name}</div>
              {contact.title && <div style={{ color: C.textDim, fontSize: 11 }}>{contact.title}</div>}
            </div>
          </div>
          {contact.phone && <div style={{ color: C.textBody, fontSize: 12, marginBottom: 4 }}>{contact.phone}</div>}
          {contact.email && <div style={{ color: C.textBody, fontSize: 12 }}>{contact.email}</div>}
        </div>
      ) : (
        <div>
          <div style={{ color: C.textDim, fontSize: 12, marginBottom: 10 }}>
            {state.notConfigured
              ? 'LeadMagic isn’t connected yet — add LEADMAGIC_API_KEY in the Vercel project to enable live contact search.'
              : state.error
                ? 'Couldn’t reach LeadMagic. Try again in a moment.'
                : state.searched
                  ? 'No contact found for this business yet.'
                  : 'No contact on file yet.'}
          </div>
          <div
            onClick={state.loading ? undefined : () => onFindContacts(b)}
            style={{
              textAlign: 'center', background: state.loading ? C.card : C.green, color: state.loading ? C.textDim : C.greenText,
              borderRadius: 8, padding: '9px 12px', fontSize: 12.5, fontWeight: 600,
              cursor: state.loading ? 'default' : 'pointer', border: '1px solid ' + (state.loading ? C.borderStrong : C.green),
            }}
          >
            {state.loading ? 'Searching…' : 'Find contacts'}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', border: '1px solid ' + C.borderStrong, borderRadius: 8, padding: '9px 12px', fontSize: 12, color: C.textBody }}>
          Directions
        </a>
        <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: 'center', border: '1px solid ' + C.borderStrong, borderRadius: 8, padding: '9px 12px', fontSize: 12, color: C.textBody }}>
          Google Maps
        </a>
      </div>
    </div>
  );
}
