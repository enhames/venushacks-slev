import React, { useState } from 'react';

export default function Home() {
  const [mood, setMood] = useState('');
  const [craving, setCraving] = useState('');
  const [symptom, setSymptom] = useState('');

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Cycle Day 9</h1>

      <h2>How are you feeling today?</h2>
      <div>
        {['very sad', 'sad', 'okay', 'good', 'very happy'].map((m) => (
          <button key={m} onClick={() => setMood(m)} style={{ marginRight: '0.5rem' }}>
            {m}
          </button>
        ))}
      </div>
      <p>Selected mood: {mood}</p>

      <h2>Today’s cravings</h2>
      <div>
        {['sweet', 'salty', 'cold', 'hot', 'nothing rn'].map((c) => (
          <button key={c} onClick={() => setCraving(c)} style={{ marginRight: '0.5rem' }}>
            {c}
          </button>
        ))}
      </div>
      <p>Selected craving: {craving}</p>

      <h2>Today’s symptoms</h2>
      <div>
        {['cramps', 'headache', 'stomach ache', 'fatigue', 'all good'].map((s) => (
          <button key={s} onClick={() => setSymptom(s)} style={{ marginRight: '0.5rem' }}>
            {s}
          </button>
        ))}
      </div>
      <p>Selected symptom: {symptom}</p>
    </div>
  );
}
