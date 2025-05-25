import React, { useState, useEffect } from 'react';

export default function PeriodHaverHome() {
  const [mood, setMood] = useState('');
  const [craving, setCraving] = useState('');
  const [symptom, setSymptom] = useState('');
  const [cycleDay, setCycleDay] = useState(null);
  const [phase, setPhase] = useState('');
  const [loadingCycle, setLoadingCycle] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.username) return;

    fetch(`http://localhost:5000/period-start/${user.username}`)
      .then(res => res.json())
      .then(data => {
        if (!data.date) {
          setLoadingCycle(false);
          return;
        }

        const startDate = new Date(data.date);
        const today = new Date();
        const diffTime = today - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const cycleDayNum = (diffDays % 28) + 1;

        setCycleDay(cycleDayNum);
        setPhase(getPhase(cycleDayNum));
        setLoadingCycle(false);
      });
  }, []);

  const getPhase = (day) => {
    if (day <= 5) return 'Menstrual Phase';
    if (day <= 13) return 'Follicular Phase';
    if (day === 14) return 'Ovulation';
    return 'Luteal Phase';
  };

  const handleLogPeriodStart = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.username) {
      alert("User not logged in.");
      return;
    }

    fetch('http://localhost:5000/period-start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.username, date: new Date().toISOString() }),
    }).then((res) => {
      if (res.ok) {
        alert("Period start logged!");
        window.location.reload();
      } else {
        alert("Failed to log period.");
      }
    });
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
    <div style={{ backgroundColor: '#B09CD3', minHeight: '100vh', fontFamily: 'Outfit', textAlign: 'center' }}>
      <header style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#B09CD3',
        paddingBottom: '1rem',
        zIndex: 10,
        borderBottom: '1px solid #57426033'
      }}>
        <h1 style={{
          fontFamily: 'DM Serif Display',
          color: '#574260',
          fontSize: '3rem',
          margin: '1rem 0 0.5rem'
        }}>
          sync’d
        </h1>

        <nav style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          marginTop: '1rem'
        }}>
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
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      <main style={{ padding: '2rem' }}>
        <h2 style={{ color: '#574260' }}>
          {loadingCycle
            ? 'Loading Cycle Info...'
            : cycleDay
              ? `Cycle Day ${cycleDay}: ${phase}`
              : 'No period start logged yet'}
        </h2>

        <button
          onClick={handleLogPeriodStart}
          style={{
            marginTop: '1rem',
            marginBottom: '2rem',
            backgroundColor: '#574260',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            padding: '0.6rem 1.2rem',
            fontSize: '14px',
            fontFamily: 'Outfit',
            cursor: 'pointer'
          }}
        >
          Log Period Start (Today)
        </button>

        {/* Mood */}
        <section>
          <h3 style={{ color: '#574260' }}>How are you feeling today?</h3>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '600px', margin: '0 auto', gap: '2rem' }}>
            {[
              { emoji: '😭', label: 'very sad' },
              { emoji: '😢', label: 'sad' },
              { emoji: '😐', label: 'okay' },
              { emoji: '🙂', label: 'good' },
              { emoji: '🥰', label: 'very happy' }
            ].map(({ emoji, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setMood(emoji)}
                  style={circleButtonStyle(mood === emoji)}
                >
                  {emoji}
                </button>
                <div style={{ fontSize: '12px', color: '#574260', marginTop: '0.3rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Cravings */}
        <section>
          <h3 style={{ color: '#574260', marginTop: '2rem' }}>Today’s cravings</h3>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '600px', margin: '0 auto', gap: '2rem' }}>
            {[
              { emoji: '🍫', label: 'sweet' },
              { emoji: '🍟', label: 'salty' },
              { emoji: '🍦', label: 'cold' },
              { emoji: '🍲', label: 'hot' },
              { emoji: '🚫', label: 'nothing!' }
            ].map(({ emoji, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setCraving(emoji)}
                  style={circleButtonStyle(craving === emoji)}
                >
                  {emoji}
                </button>
                <div style={{ fontSize: '12px', color: '#574260', marginTop: '0.3rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Symptoms */}
        <section>
          <h3 style={{ color: '#574260', marginTop: '2rem' }}>Today’s symptoms</h3>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '600px', margin: '0 auto', gap: '2rem' }}>
            {[
              { emoji: '🤕', label: 'cramps' },
              { emoji: '😖', label: 'headache' },
              { emoji: '🤢', label: 'stomach ache' },
              { emoji: '🥱', label: 'fatigue' },
              { emoji: '💪', label: 'all good' }
            ].map(({ emoji, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setSymptom(emoji)}
                  style={circleButtonStyle(symptom === emoji)}
                >
                  {emoji}
                </button>
                <div style={{ fontSize: '12px', color: '#574260', marginTop: '0.3rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
