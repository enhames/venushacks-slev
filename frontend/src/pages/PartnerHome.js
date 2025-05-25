import React from 'react';
import {
  StickyHeader,
  NavBar,
  MainContainer
} from '../components/SharedUI';

export default function PartnerHome() {
  return (
    <>
      <StickyHeader><NavBar isLoggedIn={true} /></StickyHeader>
      <MainContainer title="Your Partner's Info">
        <p>Mood: 😢</p>
        <p>Cravings: chocolate, tea</p>
        <p>Love Language: gifts</p>
        <p>Period Product Preference: pads</p>
      </MainContainer>
    </>
  );
}