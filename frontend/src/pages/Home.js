import React, { useState, useEffect } from 'react';
import PeriodHaverHome from './PeriodHaverHome';
import PartnerHome from './PartnerHome';
import { MainContainer } from '../components/SharedUI';

export default function Home() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <>
      {!user ? (
        <MainContainer title="Welcome to sync’d 💜">
          <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
            You can interact with the site, but please <strong>log in</strong> to save your info.
          </p>
          <PeriodHaverHome guestMode={true} />
        </MainContainer>
      ) : user.role === 'partner' ? (
        <PartnerHome />
      ) : (
        <PeriodHaverHome />
      )}
    </>
  );
}
