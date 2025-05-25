import React, { useEffect, useState } from 'react';
import BASE_URL from '../config';

export default function PartnerPreferences() {
  const [prefs, setPrefs] = useState(null);

  useEffect(() => {
    // Fetch from backend
    fetch(`${BASE_URL}/partner-preferences`)
      .then((res) => res.json())
      .then((data) => setPrefs(data));
  }, []);

  if (!prefs) return <p>Loading partner preferences...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your Partner’s Preferences</h1>
      <p><strong>Cravings:</strong></p>
      <ul>
        <li>Sweet: {prefs.cravings?.sweet}</li>
        <li>Salty: {prefs.cravings?.salty}</li>
        <li>Cold: {prefs.cravings?.cold}</li>
        <li>Hot: {prefs.cravings?.hot}</li>
      </ul>

      <p><strong>Period Product:</strong> {prefs.product}</p>
      <p><strong>Love Language:</strong> {prefs.loveLanguage}</p>
      <p><strong>Message:</strong> {prefs.message}</p>
    </div>
  );
}
