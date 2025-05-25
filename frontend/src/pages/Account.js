import React, { useState } from 'react';
import {
  StickyHeader,
  NavBar,
  MainContainer,
  InputBox,
  ActionButton
} from '../components/SharedUI';

export default function Account() {
  const [partnerName, setPartnerName] = useState('');

  const handleLink = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await fetch('http://localhost:5000/link-partner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.username,
        partner: partnerName,
      }),
    });

    const data = await res.json();
    if (res.ok) alert("Partner linked!");
    else alert(data.error || "Failed to link partner");
  };

  return (
    <>
      <StickyHeader><NavBar isLoggedIn={true} /></StickyHeader>
      <MainContainer title="Sync with Your Partner">
        <InputBox
          value={partnerName}
          onChange={(e) => setPartnerName(e.target.value)}
          placeholder="Enter partner's username"
        />
        <ActionButton onClick={handleLink} label="Link Partner" />
      </MainContainer>
    </>
  );
}