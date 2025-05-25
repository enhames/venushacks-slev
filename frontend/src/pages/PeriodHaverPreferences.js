import React, { useState } from 'react';

export default function PeriodHaverPreferences() {
  const [cravings, setCravings] = useState({ sweet: '', salty: '', cold: '', hot: '' });
  const [product, setProduct] = useState('');
  const [loveLanguage, setLoveLanguage] = useState('');
  const [message, setMessage] = useState('');
  const [saved, setSaved] = useState(false);

  const handleCravingChange = (type, value) => {
    setCravings((prev) => ({ ...prev, [type]: value }));
  };

  const handleSubmit = () => {
    // Save preferences logic here (e.g., POST to backend)
    console.log({ cravings, product, loveLanguage, message });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
    <div style={{ backgroundColor: '#B09CD3', minHeight: '100vh', fontFamily: 'Outfit' }}>
      <header style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#B09CD3',
        paddingBottom: '1rem',
        zIndex: 10,
        borderBottom: '1px solid #57426033',
        textAlign: 'center'
      }}>
        <h1 style={{ fontFamily: 'DM Serif Display', color: '#574260', fontSize: '3rem', marginBottom: '0.5rem' }}>sync’d</h1>
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
          {['Home', 'Preferences', 'Sign Up', 'Login', 'Account'].map((label) => (
            <a
              key={label}
              href={`/${label.toLowerCase().replace(' ', '')}`}
              style={{
                textDecoration: 'none',
                padding: '0.5rem 1.2rem',
                borderRadius: '8px',
                backgroundColor: '#574260',
                color: '#fff',
                fontFamily: 'Outfit',
                fontWeight: 500,
                fontSize: '14px'
              }}
            >{label}</a>
          ))}
        </nav>
      </header>

      <main style={{ padding: '2rem', textAlign: 'center', color: '#574260' }}>
        <h2>Your Preferences</h2>

        <h3>Cravings</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: '500px', margin: 'auto', gap: '1rem' }}>
          {['sweet', 'salty', 'cold', 'hot'].map((type) => (
            <label key={type} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {type.charAt(0).toUpperCase() + type.slice(1)}:
              <input
                type="text"
                value={cravings[type]}
                onChange={(e) => handleCravingChange(type, e.target.value)}
                placeholder={`e.g. ${type === 'cold' ? 'boba' : type === 'hot' ? 'tea' : type === 'sweet' ? 'cookies' : 'chips'}`}
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
                onClick={() => setLoveLanguage(emoji)}
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
          placeholder="Write something for your partner 📨"
          rows={4}
          style={{ padding: '0.5rem', width: '80%', maxWidth: '600px', fontFamily: 'Outfit' }}
        />

        <div style={{ marginTop: '2rem' }}>
          <button onClick={handleSubmit} style={{
            backgroundColor: '#574260',
            color: '#fff',
            border: 'none',
            padding: '0.7rem 1.5rem',
            borderRadius: '8px',
            fontFamily: 'Outfit',
            cursor: 'pointer'
          }}>
            Save Preferences
          </button>
        </div>

        {saved && <p style={{ marginTop: '1rem', color: '#fff', fontWeight: 'bold' }}>Preferences saved ✅</p>}
      </main>
    </div>
  );
}
