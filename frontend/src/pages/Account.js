import React, { useEffect, useState } from 'react';
import {
  StickyHeader,
  NavBar,
  MainContainer,
  InputBox,
  ActionButton
} from '../components/SharedUI';
import { updatePartner, getPartner, removePartner } from '../front_end_api/front_partner_api';

export default function Account() {
  const [partnerName, setPartnerName] = useState('');
  const [hasPartner, setHasPartner] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    getPartner(user.username)
      .then(data => {
        setPartnerName(data.partner_username);
        setHasPartner(true);
      })
      .catch(err => {
        console.log("No partner linked.");
        setHasPartner(false);
      });
  }, []);

  const handleLink = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      const data = await updatePartner(user.username, partnerName);
      if (data) {
        alert("Partner linked!");
        setHasPartner(true);
      }
    } catch (err) {
      alert(err.message || "Failed to link partner");
    }
  };

  const handleUnlink = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
      await removePartner(user.username);
      setPartnerName('');
      setHasPartner(false);
      alert("Partner removed.");
    } catch (err) {
      alert("Failed to unlink partner.");
    }
  };

  return (
    <>
      <StickyHeader><NavBar isLoggedIn={true} /></StickyHeader>
      <MainContainer title="Sync with Your Partner">
        {hasPartner ? (
          <>
            <p><strong>Currently linked with:</strong> {partnerName}</p>
            <ActionButton onClick={handleUnlink} label="Unlink Partner" />
          </>
        ) : (
          <>
            <InputBox
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Enter partner's username"
            />
            <ActionButton onClick={handleLink} label="Link Partner" />
          </>
        )}
      </MainContainer>
    </>
  );
}