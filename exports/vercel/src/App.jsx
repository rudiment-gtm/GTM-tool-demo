import React, { useCallback, useEffect, useRef, useState } from 'react';
import { C } from './theme.js';
import { CLAUDE_MODEL_IDS, COUNTS, MAP_CHAT_SYSTEM, TOTAL_ACCOUNTS, pickReply } from './data.js';
import Sidebar from './components/Sidebar.jsx';
import MapView from './views/MapView.jsx';
import ChatView from './views/ChatView.jsx';
import ProspectView from './views/ProspectView.jsx';
import ContactsView from './views/ContactsView.jsx';
import Toast from './components/Toast.jsx';
import { loadSavedContacts, persistSavedContacts } from './services/contactStorage.js';

const MONTHLY_CREDITS = 5000;
const TABS = ['chat', 'map', 'prospect', 'contacts'];

function countFor(groups) {
  if (!groups.length) return TOTAL_ACCOUNTS;
  return groups.reduce((min, g) => Math.min(min, COUNTS[g.field + ':' + g.value] ?? 500), TOTAL_ACCOUNTS);
}

export default function App() {
  // Tab lives in the URL hash so every destination is deep-linkable.
  const [tab, setTabState] = useState(() => {
    const h = window.location.hash.replace('#/', '');
    return TABS.includes(h) ? h : 'chat';
  });
  const setTab = useCallback((next) => {
    setTabState(next);
    window.history.replaceState(null, '', '#/' + next);
  }, []);
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace('#/', '');
      if (TABS.includes(h)) setTabState(h);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const [toast, setToast] = useState(null);
  const toastTimer = useRef();
  const flash = useCallback((msg) => {
    clearTimeout(toastTimer.current);
    setToast(msg);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  // credits ------------------------------------------------------------
  const [credits, setCredits] = useState(4180);
  const spend = useCallback((n) => setCredits((c) => Math.max(0, c - n)), []);

  // map ----------------------------------------------------------------
  const [groups, setGroups] = useState([{ id: 1, field: 'Status', value: 'Canceled' }]);
  const nextGroupId = useRef(2);
  const [showing, setShowing] = useState(710);
  const [pinned, setPinned] = useState(null);
  const [mapSearch, setMapSearch] = useState('');

  const applyGroups = useCallback((next) => {
    setGroups(next);
    setShowing(countFor(next));
    setPinned(null);
  }, []);

  // chat ---------------------------------------------------------------
  const [model, setModel] = useState('Claude Sonnet 5');
  const [messages, setMessages] = useState([]);
  const [chatTitle, setChatTitle] = useState('New chat');
  const [thinking, setThinking] = useState(false);
  const replyTimer = useRef();
  useEffect(() => () => clearTimeout(replyTimer.current), []);

  const send = useCallback(async (raw) => {
    const text = (raw || '').trim();
    if (!text || thinking) return;
    const history = [...messages, { role: 'user', text }];
    setMessages(history);
    setChatTitle((t) => (messages.length ? t : text.slice(0, 46)));
    setThinking(true);

    const claudeModelId = CLAUDE_MODEL_IDS[model];
    if (!claudeModelId) {
      // No key connected for this model (e.g. GPT-5) - fall back to the canned demo replies.
      const reply = pickReply(text);
      clearTimeout(replyTimer.current);
      replyTimer.current = setTimeout(() => {
        setThinking(false);
        setMessages((m) => [...m, { role: 'bot', ...reply }]);
      }, 900);
      return;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: claudeModelId,
          system: MAP_CHAT_SYSTEM,
          messages: history.map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      setThinking(false);
      if (data.notConfigured) {
        setMessages((m) => [...m, { role: 'bot', text: "Claude isn't connected yet - add ANTHROPIC_API_KEY in the Vercel project to enable real replies." }]);
      } else if (!res.ok || data.error) {
        setMessages((m) => [...m, { role: 'bot', text: 'Claude request failed: ' + (data.error || res.status) }]);
      } else {
        setMessages((m) => [...m, { role: 'bot', text: data.text, rows: data.rows, columns: data.columns, count: data.count, pin: data.pin }]);
      }
    } catch {
      setThinking(false);
      setMessages((m) => [...m, { role: 'bot', text: 'Could not reach Claude - check your connection and try again.' }]);
    }
  }, [messages, thinking, model]);

  const applyToMap = useCallback((reply) => {
    setShowing(reply.count);
    setPinned(reply.pin);
    setTab('map');
    flash('Map updated - ' + reply.count + ' accounts pinned');
  }, [flash, setTab]);

  // prospect -> map contact handoff -------------------------------------
  // Prospect tab looks up real employees per business and lets a rep push any
  // of them over to the Map tab; Map tab reveals email/phone on demand and
  // saves each to localStorage (via contactStorage.js) so the business's full
  // contact list - not just one "main" contact - survives a reload.
  const [savedContacts, setSavedContacts] = useState(() => loadSavedContacts()); // mapsUrl -> Contact[]
  const [pendingContacts, setPendingContacts] = useState(null); // { mapsUrl, people: [{ firstName, lastName, title, linkedinUrl }] }
  const [focusMapsUrl, setFocusMapsUrl] = useState(null);

  // Saves (or updates, matched by name) one contact into that business's saved list.
  const saveContact = useCallback((mapsUrl, contact) => {
    setSavedContacts((prev) => {
      const existing = prev[mapsUrl] || [];
      const i = existing.findIndex((c) => c.name === contact.name);
      const list = i >= 0 ? existing.map((c, n) => (n === i ? contact : c)) : [...existing, contact];
      const next = { ...prev, [mapsUrl]: list };
      persistSavedContacts(next);
      return next;
    });
  }, []);

  // employees: one or more { firstName, lastName, title, linkedinUrl } picked in the Prospect tab.
  const pushToMap = useCallback((business, employees) => {
    setPendingContacts({
      mapsUrl: business.mapsUrl,
      people: employees.map((e) => ({ firstName: e.firstName, lastName: e.lastName, title: e.title, linkedinUrl: e.linkedinUrl || null })),
    });
    setFocusMapsUrl(business.mapsUrl);
    setTab('map');
  }, [setTab]);

  // Jumps to the Map tab and opens the given business - MapView's own effects
  // pick its saved contacts back up from savedContacts once selected.
  const viewContactOnMap = useCallback((mapsUrl) => {
    setFocusMapsUrl(mapsUrl);
    setTab('map');
  }, [setTab]);

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', background: C.bg, color: '#EDEDEA', overflow: 'hidden' }}>
      <Sidebar
        tab={tab}
        setTab={setTab}
        credits={credits}
        monthly={MONTHLY_CREDITS}
        showing={showing}
        groups={groups}
        applyGroups={applyGroups}
        addGroup={() => applyGroups([...groups, { id: nextGroupId.current++, field: 'Services', value: 'Mowing' }])}
        recentOpen={(title) => { setMessages([]); setChatTitle(title); setTab('chat'); send(title); }}
        newChat={() => { setMessages([]); setChatTitle('New chat'); }}
        savedContacts={savedContacts}
      />

      <div style={{ flex: 1, position: 'relative', minWidth: 0, background: C.surface }}>
        {/* Map stays mounted so switching tabs never re-initializes it. */}
        <MapView
          active={tab === 'map'}
          showing={showing}
          pinned={pinned}
          clearPinned={() => { setPinned(null); setShowing(countFor(groups)); }}
          mapSearch={mapSearch}
          setMapSearch={setMapSearch}
          onSync={() => flash('Syncing from Clay - 2,773 accounts up to date')}
          onSurrounding={() => flash('3 businesses found nearby')}
          onAsk={() => setTab('chat')}
          savedContacts={savedContacts}
          onSaveContact={saveContact}
          pendingContacts={pendingContacts}
          focusMapsUrl={focusMapsUrl}
          onFocusHandled={() => { setFocusMapsUrl(null); setPendingContacts(null); }}
          spend={spend}
          flash={flash}
        />

        {tab === 'chat' && (
          <ChatView
            title={chatTitle}
            model={model}
            setModel={setModel}
            messages={messages}
            thinking={thinking}
            showing={showing}
            onSend={send}
            onShowOnMap={applyToMap}
            onBuildRoute={(m) => { setPinned('Route - ' + (m.count || 6) + ' stops'); setTab('map'); flash('Route built - 1h 48m'); }}
            onExport={(m) => flash('CSV exported - ' + (m.rows ? m.rows.length : 0) + ' rows')}
          />
        )}

        {tab === 'prospect' && (
          <ProspectView onPushToMap={pushToMap} spend={spend} flash={flash} />
        )}

        {tab === 'contacts' && (
          <ContactsView
            savedContacts={savedContacts}
            onViewOnMap={viewContactOnMap}
            onExport={() => flash('CSV exported')}
          />
        )}

        <Toast message={toast} />
      </div>
    </div>
  );
}
