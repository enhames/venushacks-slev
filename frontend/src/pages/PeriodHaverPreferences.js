import { setPreferences } from '../front_end_api/front_preferences_api.js';
import React, { useState } from 'react';
import {
  StickyHeader,
  NavBar,
  MainContainer,
  ActionButton,
  InputBox
} from '../components/SharedUI';

export default function PeriodHaverPreferences() {
  const [cravings, setCravings] = useState({ sweet: '', salty: '', cold: '', hot: '' });
  const [product, setProduct] = useState('');
  const [loveLanguage, setLoveLanguage] = useState('');
  const [message, setMessage] = useState('');
  const [saved, setSaved] = useState(false);

  const isGuest = !localStorage.getItem('user');

  const handleCravingChange = (type, value) => {
    setCravings((prev) => ({ ...prev, [type]: value }));
  };

  const handleSubmit = async () => {
    if (isGuest) {
      alert("Please log in to save your preferences.");
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const preferences = {
      cravings,
      product,
      loveLanguage,
      message,
    };

    try {
      await setPreferences(user.username, preferences);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Failed to save preferences:", err);
      alert("Something went wrong saving your preferences.");
    }
  };

  const handleLoveLanguageClick = (emoji) => {
    if (isGuest) {
      alert("Please log in to select a love language.");
      return;
    }
    setLoveLanguage(emoji);
  };

  const circleButtonStyle = (selected) => ({
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: selected ? '#574260' : '#ddd',
    color: selected ? '#fff' : '#574260',
    fontWeight: 'bold',
    border: selected ? '3px solid #fff' : 'none',
    margin: '0.5rem',
    cursor: 'pointer',
    fontFamily: 'Outfit',
    fontSize: '22px',
  });

  return (
    <>
      <StickyHeader><NavBar isLoggedIn={!isGuest} /></StickyHeader>
      <MainContainer title="Your Preferences">
        <h3>Cravings</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: '500px', margin: 'auto', gap: '1rem' }}>
          {['sweet', 'salty', 'cold', 'hot'].map((type) => (
            <label key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {type.charAt(0).toUpperCase() + type.slice(1)}:
              <input
                type="text"
                value={cravings[type]}
                onChange={(e) => handleCravingChange(type, e.target.value)}
                placeholder={`(text box)`}
                style={{ padding: '0.5rem', width: '100%' }}
              />
            </label>
          ))}
        </div>

        <h3 style={{ marginTop: '2rem' }}>Preferred Period Product(s)</h3>
        <textarea
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="e.g. pads, tampons, cup... get specific!"
          rows={2}
          style={{ padding: '0.5rem', width: '80%', maxWidth: '600px', fontFamily: 'Outfit' }}
        />

        <h3 style={{ marginTop: '2rem' }}>Love Language</h3>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          {[
            { emoji: '🎁', label: 'receiving gifts' },
            { emoji: '💬', label: 'words of affirmation' },
            { emoji: '🧹', label: 'acts of service' },
            { emoji: '🤗', label: 'physical touch' },
            { emoji: '⏰', label: 'quality time' },
          ].map(({ emoji, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <button
                onClick={() => handleLoveLanguageClick(emoji)}
                style={circleButtonStyle(loveLanguage === emoji)}
              >{emoji}</button>
              <div style={{ fontSize: '12px', marginTop: '0.3rem' }}>{label}</div>
            </div>
          ))}
        </div>

        <h3 style={{ marginTop: '2rem' }}>Message to Partner</h3>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write something for your partner 💌"
          rows={4}
          style={{ padding: '0.5rem', width: '80%', maxWidth: '600px', fontFamily: 'Outfit' }}
        />

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <ActionButton onClick={handleSubmit} label="Save Preferences" />
          {saved && <p style={{ marginTop: '1rem', color: '#fff', fontWeight: 'bold' }}>Preferences saved ✅</p>}
        </div>
      </MainContainer>
    </>
  );
}