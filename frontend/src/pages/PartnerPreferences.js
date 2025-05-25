import React, { useEffect, useState } from 'react';
import {
  StickyHeader,
  NavBar,
  MainContainer
} from '../components/SharedUI';
import { BASE_URL } from '../config';

export default function PartnerPreferences() {
  const [prefs, setPrefs] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    fetch(`${BASE_URL}/partner-preferences?username=${user.username}`)
      .then((res) => res.json())
      .then((data) => setPrefs(data));
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
