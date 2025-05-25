import { removePartner, updatePartner } from '../front_end_api/front_partner_api.js';
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
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (partnerName.trim() === '') {
        await removePartner(user.username);
        alert('Partner removed~');
      } else {
        await updatePartner(user.username, partnerName.trim());
        alert('Partner linked!');
      }
    } catch (error) {
      alert(error.message || 'Failed to link partner');
    }
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