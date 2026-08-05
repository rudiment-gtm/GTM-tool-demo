// BUSINESSES addresses are consistently "<street>, <city>, <state zip>, USA".
export function cityFromAddress(address) {
  const parts = (address || '').split(',').map((s) => s.trim());
  return parts.length >= 2 ? parts[1] : '';
}
