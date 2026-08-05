// Persists saved contacts (business.mapsUrl -> contact) to the browser so they
// survive a reload. There's no backend in this demo, so localStorage is it.
const KEY = 'gtm-saved-contacts';

export function loadSavedContacts() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function persistSavedContacts(contacts) {
  try {
    localStorage.setItem(KEY, JSON.stringify(contacts));
  } catch {
    // Private browsing / storage quota - saved contacts just won't persist this time.
  }
}
