import React from 'react';
import { C, label } from '../theme.js';

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('');
}

function externalUrl(url) {
  return /^https?:\/\//.test(url) ? url : `https://${url}`;
}

const row = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid ' + C.border };
const rowLabel = { color: C.textDim, fontSize: 12 };
const rowValue = { color: '#EDEDEA', fontSize: 12.5, textAlign: 'right', maxWidth: 220 };

function ContactCard({ contact, onRevealEmail, onRevealPhone, onSaveContact }) {
  return (
    <div style={{ background: C.card, border: '1px solid ' + C.borderStrong, borderRadius: 10, padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1F6F45', color: '#DFF7E8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600 }}>
            {initials(contact.name || '?')}
          </div>
          <div>
            <div style={{ color: '#EDEDEA', fontSize: 12.5, fontWeight: 600 }}>{contact.name}</div>
            {contact.title && <div style={{ color: C.textDim, fontSize: 11 }}>{contact.title}</div>}
          </div>
        </div>
        {contact.saved && <span style={{ color: C.green, fontSize: 10.5 }}>Saved &#10003;</span>}
      </div>

      {contact.linkedinUrl && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
          <span style={{ color: C.textDim, fontSize: 11.5 }}>LinkedIn</span>
          <a href={externalUrl(contact.linkedinUrl)} target="_blank" rel="noopener noreferrer" style={{ color: C.green, fontSize: 11.5 }}>View profile</a>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
        <span style={{ color: C.textDim, fontSize: 11.5 }}>Email</span>
        {contact.email ? (
          <span style={{ color: C.textBody, fontSize: 12 }}>{contact.email}</span>
        ) : contact.notConfiguredReveal ? (
          <span style={{ color: C.textFaint, fontSize: 11.5 }}>Not connected</span>
        ) : contact.firstName && contact.lastName ? (
          <span
            onClick={contact.revealingEmail ? undefined : onRevealEmail}
            style={{ color: contact.revealingEmail ? C.textDim : C.green, fontSize: 11.5, cursor: contact.revealingEmail ? 'default' : 'pointer' }}
          >
            {contact.revealingEmail ? 'Revealing…' : 'Reveal email'}
          </span>
        ) : (
          <span style={{ color: C.textFaint, fontSize: 11.5 }}>—</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0' }}>
        <span style={{ color: C.textDim, fontSize: 11.5 }}>Mobile</span>
        {contact.phone ? (
          <span style={{ color: C.textBody, fontSize: 12 }}>{contact.phone}</span>
        ) : contact.notConfiguredReveal ? (
          <span style={{ color: C.textFaint, fontSize: 11.5 }}>Not connected</span>
        ) : contact.email ? (
          <span
            onClick={contact.revealingPhone ? undefined : onRevealPhone}
            style={{ color: contact.revealingPhone ? C.textDim : C.green, fontSize: 11.5, cursor: contact.revealingPhone ? 'default' : 'pointer' }}
          >
            {contact.revealingPhone ? 'Revealing…' : 'Reveal mobile'}
          </span>
        ) : (
          <span style={{ color: C.textFaint, fontSize: 11.5 }}>Reveal email first</span>
        )}
      </div>

      <div
        onClick={onSaveContact}
        style={{ marginTop: 10, textAlign: 'center', border: '1px solid ' + C.borderStrong, borderRadius: 8, padding: '7px 12px', fontSize: 11.5, color: C.textBody, cursor: 'pointer' }}
      >
        {contact.saved ? 'Update saved contact' : 'Save contact'}
      </div>
    </div>
  );
}

export default function BusinessPanel({ business, contactState, onFindContacts, onRevealEmail, onRevealPhone, onSaveContact, onClose }) {
  if (!business) return null;
  const b = business;
  const state = contactState || {};
  const contacts = Object.values(state.contacts || {});
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
          {b.website ? <a href={externalUrl(b.website)} target="_blank" rel="noopener noreferrer" style={{ color: C.green }}>{b.website.replace(/^https?:\/\//, '')}</a> : '—'}
        </span>
      </div>
      <div style={{ ...row, borderBottom: 'none', alignItems: 'flex-start' }}>
        <span style={rowLabel}>Address</span>
        <span style={rowValue}>{b.address}</span>
      </div>

      <div style={{ ...label, margin: '18px 0 10px' }}>CONTACTS{contacts.length > 1 ? ` (${contacts.length})` : ''}</div>

      {contacts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 10 }}>
          {contacts.map((contact) => (
            <ContactCard
              key={contact.name}
              contact={contact}
              onRevealEmail={() => onRevealEmail(b, contact.name)}
              onRevealPhone={() => onRevealPhone(b, contact.name)}
              onSaveContact={() => onSaveContact(b, contact.name)}
            />
          ))}
        </div>
      )}

      <div>
        {contacts.length === 0 && (
          <div style={{ color: C.textDim, fontSize: 12, marginBottom: 10 }}>
            {state.notConfigured
              ? 'LeadMagic isn’t connected yet — add LEADMAGIC_API_KEY in the Vercel project to enable live contact search.'
              : state.error
                ? 'Couldn’t reach LeadMagic. Try again in a moment.'
                : state.searched
                  ? 'No contact found for this business yet.'
                  : 'No contacts on file yet.'}
          </div>
        )}
        <div
          onClick={state.loading ? undefined : () => onFindContacts(b)}
          style={{
            textAlign: 'center', background: state.loading ? C.card : C.green, color: state.loading ? C.textDim : C.greenText,
            borderRadius: 8, padding: '9px 12px', fontSize: 12.5, fontWeight: 600,
            cursor: state.loading ? 'default' : 'pointer', border: '1px solid ' + (state.loading ? C.borderStrong : C.green),
          }}
        >
          {state.loading ? 'Searching…' : contacts.length > 0 ? 'Find another contact' : 'Find contacts'}
        </div>
      </div>

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
