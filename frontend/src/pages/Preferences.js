import React, { useState } from 'react';

export default function Preferences() {
  const [cravings, setCravings] = useState({
    sweet: '',
    salty: '',
    cold: '',
    hot: '',
  });

  const [product, setProduct] = useState('');
  const [loveLanguage, setLoveLanguage] = useState('');
  const [message, setMessage] = useState('');

  const handleCravingChange = (type, value) => {
    setCravings((prev) => ({ ...prev, [type]: value }));
  };

  const handleSubmit = () => {
    const data = {
      cravings,
      product,
      loveLanguage,
      message,
    };

    console.log('Submitting to backend:', data);
    // When backend is ready:
    // fetch('http://localhost:5000/preferences', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    // })
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your Preferences</h1>

      <h2>Cravings</h2>
      {['sweet', 'salty', 'cold', 'hot'].map((type) => (
        <div key={type} style={{ marginBottom: '1rem' }}>
          <label>{type.charAt(0).toUpperCase() + type.slice(1)}:</label>
          <input
            type="text"
            value={cravings[type]}
            onChange={(e) => handleCravingChange(type, e.target.value)}
            style={{ marginLeft: '0.5rem', padding: '0.3rem' }}
          />
        </div>
      ))}

      <h2>Preferred Period Product</h2>
      <input
        type="text"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="e.g., pads, tampons, menstrual cup"
        style={{ marginBottom: '1rem', padding: '0.3rem', width: '100%' }}
      />

      <h2>Love Language</h2>
      {['receiving gifts', 'words of affirmation', 'acts of service', 'physical touch', 'quality time'].map((l) => (
        <button
          key={l}
          onClick={() => setLoveLanguage(l)}
          style={{
            marginRight: '0.5rem',
            backgroundColor: loveLanguage === l ? '#e0b0ff' : '#eee',
          }}
        >
          {l}
        </button>
      ))}

      <h2>Message to Partner</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write something for your partner 💌"
        rows={4}
        style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
      />

      <div style={{ marginTop: '1.5rem' }}>
        <button onClick={handleSubmit}>Save Preferences</button>
      </div>
    </div>
  );
}
