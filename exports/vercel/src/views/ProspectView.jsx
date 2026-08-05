import React, { useMemo, useState } from 'react';
import { C, mono } from '../theme.js';
import { BUSINESSES } from '../data.js';
import { findEmployees } from '../services/leadmagic.js';
import { cityFromAddress } from '../utils/address.js';

const chipSelect = {
  background: C.cardAlt,
  border: '1px solid ' + C.borderStrong,
  color: C.textDim,
  borderRadius: 7,
  padding: '5px 10px',
  fontSize: 11.5,
  outline: 'none',
};

export default function ProspectView({ onPushToMap, spend, flash }) {
  const [query, setQuery] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [city, setCity] = useState('All cities');
  const [expanded, setExpanded] = useState(null); // mapsUrl of the expanded business
  const [titleFilter, setTitleFilter] = useState('');
  const [employeesByBusiness, setEmployeesByBusiness] = useState({}); // mapsUrl -> { loading, error, notConfigured, employees }

  const cities = useMemo(() => {
    const set = new Set(BUSINESSES.map((b) => cityFromAddress(b.address)).filter(Boolean));
    return ['All cities', ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BUSINESSES.filter((b) => {
      if (q && !`${b.name} ${b.address}`.toLowerCase().includes(q)) return false;
      if (minRating && (!b.rating || b.rating < minRating)) return false;
      if (city !== 'All cities' && cityFromAddress(b.address) !== city) return false;
      return true;
    });
  }, [query, minRating, city]);

  const toggleExpand = async (business) => {
    const key = business.mapsUrl;
    if (expanded === key) {
      setExpanded(null);
      return;
    }
    setExpanded(key);
    setTitleFilter('');
    if (employeesByBusiness[key]) return; // already fetched (or fetching)

    setEmployeesByBusiness((s) => ({ ...s, [key]: { loading: true } }));
    try {
      const data = await findEmployees(business);
      if (data.notConfigured) {
        setEmployeesByBusiness((s) => ({ ...s, [key]: { loading: false, notConfigured: true, employees: [] } }));
        return;
      }
      spend?.(1);
      const employees = data.employees || [];
      setEmployeesByBusiness((s) => ({ ...s, [key]: { loading: false, employees } }));
      flash?.(`Found ${employees.length} employee${employees.length === 1 ? '' : 's'} - 1 credit used`);
    } catch {
      setEmployeesByBusiness((s) => ({ ...s, [key]: { loading: false, error: true, employees: [] } }));
    }
  };

  return (
    <div style={{ position: 'absolute', inset: 0, background: C.surface, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 46, flexShrink: 0, borderBottom: '1px solid ' + C.line, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
        <div style={{ color: '#EDEDEA', fontSize: 13, fontWeight: 600 }}>Prospect</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ background: C.card, border: '1px solid ' + C.borderStrong, borderRadius: 12, padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search businesses by name or address..."
            style={{ background: 'transparent', border: 'none', outline: 'none', color: '#EDEDEA', fontSize: 13.5 }}
          />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <select value={city} onChange={(e) => setCity(e.target.value)} style={chipSelect}>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} style={chipSelect}>
              <option value={0}>Any rating</option>
              <option value={3}>3.0+ rating</option>
              <option value={4}>4.0+ rating</option>
              <option value={4.5}>4.5+ rating</option>
            </select>
          </div>
        </div>

        <div style={{ color: C.textDim, fontSize: 11, fontFamily: mono, letterSpacing: '.1em' }}>
          {filtered.length} RESULTS
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map((b, bi) => {
            const key = b.mapsUrl;
            const isOpen = expanded === key;
            const employeeState = employeesByBusiness[key];
            const employees = (employeeState?.employees || []).filter((e) =>
              !titleFilter.trim() || (e.title || '').toLowerCase().includes(titleFilter.trim().toLowerCase())
            );
            const toggleLabel = isOpen ? '−' : employeeState ? 'View people' : 'Find people';

            return (
              <div key={key} style={{ border: '1px solid ' + C.border, background: C.card, borderRadius: 11, overflow: 'hidden' }}>
                <div
                  onClick={() => toggleExpand(b)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', cursor: 'pointer' }}
                >
                  <div>
                    <div style={{ color: '#EDEDEA', fontSize: 12.5, fontWeight: 600 }}>{b.name}</div>
                    <div style={{ color: C.textDim, fontSize: 11.5 }}>
                      {cityFromAddress(b.address)}{b.rating ? ` · ${b.rating.toFixed(1)} ★ (${b.reviews.toLocaleString()})` : ''}
                    </div>
                  </div>
                  <div style={{ color: C.textDim, fontSize: 12 }}>{toggleLabel}</div>
                </div>

                {isOpen && (
                  <div style={{ borderTop: '1px solid ' + C.line, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {employeeState?.loading && <div style={{ color: C.textDim, fontSize: 12 }}>Searching employees...</div>}
                    {employeeState?.notConfigured && (
                      <div style={{ color: C.textDim, fontSize: 12 }}>LeadMagic isn't connected yet - add LEADMAGIC_API_KEY in the Vercel project.</div>
                    )}
                    {employeeState?.error && <div style={{ color: C.textDim, fontSize: 12 }}>Couldn't reach LeadMagic. Try again in a moment.</div>}
                    {employeeState && !employeeState.loading && !employeeState.notConfigured && !employeeState.error && employeeState.employees.length === 0 && (
                      <div style={{ color: C.textDim, fontSize: 12 }}>No employees found for this company.</div>
                    )}

                    {employeeState?.employees?.length > 0 && (
                      <>
                        <input
                          value={titleFilter}
                          onChange={(e) => setTitleFilter(e.target.value)}
                          placeholder="Filter by job title (e.g. owner, manager)..."
                          style={{ background: C.cardAlt, border: '1px solid ' + C.border, borderRadius: 7, padding: '6px 10px', color: '#EDEDEA', fontSize: 12, outline: 'none' }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {employees.map((e, ei) => (
                            <div key={`${bi}-${ei}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', background: C.cardAlt, borderRadius: 8 }}>
                              <div>
                                <div style={{ color: '#EDEDEA', fontSize: 12.5 }}>{e.firstName} {e.lastName}</div>
                                {e.title && <div style={{ color: C.textDim, fontSize: 11 }}>{e.title}</div>}
                                {e.linkedinUrl && (
                                  <a
                                    href={/^https?:\/\//.test(e.linkedinUrl) ? e.linkedinUrl : `https://${e.linkedinUrl}`}
                                    target="_blank" rel="noopener noreferrer"
                                    onClick={(ev) => ev.stopPropagation()}
                                    style={{ color: C.green, fontSize: 10.5 }}
                                  >
                                    LinkedIn
                                  </a>
                                )}
                              </div>
                              <div
                                onClick={() => { onPushToMap(b, e); flash?.(`Pushed ${e.firstName} ${e.lastName} to the Map tab`); }}
                                style={{ border: '1px solid ' + C.greenBorder, color: C.green, borderRadius: 7, padding: '4px 9px', fontSize: 11, cursor: 'pointer' }}
                              >
                                Push to Map &#8594;
                              </div>
                            </div>
                          ))}
                          {employees.length === 0 && <div style={{ color: C.textDim, fontSize: 12 }}>No employees match "{titleFilter}".</div>}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && <div style={{ color: C.textDim, fontSize: 12.5 }}>No businesses match these filters.</div>}
        </div>
      </div>
    </div>
  );
}
