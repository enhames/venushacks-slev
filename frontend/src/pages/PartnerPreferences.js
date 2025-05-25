import React, { useEffect, useState } from 'react';
import {
  StickyHeader,
  NavBar,
  MainContainer
} from '../components/SharedUI';
import { getPreferences } from '../front_end_api/front_preferences_api';

export default function PartnerPreferences() {
  const [prefs, setPrefs] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.partner) return;
    getPreferences(user.partner)
      .then((data) => setPrefs(data))
      .catch(err => console.error("Failed to load partner preferences:", err));
  }, []);

  return (
    <>
      <StickyHeader><NavBar isLoggedIn={true} /></StickyHeader>
      <MainContainer title="Your Partner’s Preferences">
        {!prefs ? (
          <p>Loading partner preferences...</p>
        ) : (
          <>
            <p><strong>Cravings:</strong></p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>Sweet: {prefs.cravings?.sweet}</li>
              <li>Salty: {prefs.cravings?.salty}</li>
              <li>Cold: {prefs.cravings?.cold}</li>
              <li>Hot: {prefs.cravings?.hot}</li>
            </ul>
            <p><strong>Period Product:</strong> {prefs.product}</p>
            <p><strong>Love Language:</strong> {prefs.loveLanguage}</p>
            <p><strong>Message:</strong> {prefs.message}</p>
          </>
        )}
      </MainContainer>
    </>
  );
}
