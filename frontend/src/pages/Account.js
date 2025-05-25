import React, { useState } from 'react';

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
    <div style={{ padding: '2rem' }}>
      <h1>Sync with Your Partner</h1>
      <input
        value={partnerName}
        onChange={(e) => setPartnerName(e.target.value)}
        placeholder="Enter partner's username"
      />
      <button onClick={handleLink}>Link Partner</button>
    </div>
  );
}
