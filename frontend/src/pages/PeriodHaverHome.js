import React, { useState, useEffect } from 'react';

export default function PeriodHaverHome() {
  const [mood, setMood] = useState('');
  const [craving, setCraving] = useState('');
  const [symptom, setSymptom] = useState('');
  const [cycleDay, setCycleDay] = useState(null);
  const [phase, setPhase] = useState('');
  const [loadingCycle, setLoadingCycle] = useState(true);

  // On page load, get period start date and calculate cycle info
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

  const handleSubmit = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.username) {
      alert("User not logged in.");
      return;
    }

    const data = {
      username: user.username,
      mood,
      craving,
      symptom,
    };

    fetch('http://localhost:5000/daily', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) alert("Saved!");
        else alert("Error saving.");
      })
      .catch((err) => {
        console.error("Submit error:", err);
        alert("Something went wrong.");
      });
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

  return (
    <div style={{ padding: '2rem' }}>
      <h1>
        {loadingCycle
          ? 'Loading Cycle Info...'
          : cycleDay
            ? `Cycle Day ${cycleDay} — ${phase}`
            : 'No period start logged yet'}
      </h1>

      <button onClick={handleLogPeriodStart} style={{ marginBottom: '1rem' }}>
        Log Period Start (Today)
      </button>

      <h2>How are you feeling today?</h2>
      <div>
        {['very sad', 'sad', 'okay', 'good', 'very happy'].map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            style={{
              marginRight: '0.5rem',
              backgroundColor: mood === m ? '#e0b0ff' : '#eee',
            }}
          >
            {m}
          </button>
        ))}
      </div>
      <p>Selected mood: {mood}</p>

      <h2>Today’s cravings</h2>
      <div>
        {['sweet', 'salty', 'cold', 'hot', 'nothing rn'].map((c) => (
          <button
            key={c}
            onClick={() => setCraving(c)}
            style={{
              marginRight: '0.5rem',
              backgroundColor: craving === c ? '#e0b0ff' : '#eee',
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <p>Selected craving: {craving}</p>

      <h2>Today’s symptoms</h2>
      <div>
        {['cramps', 'headache', 'stomach ache', 'fatigue', 'all good'].map((s) => (
          <button
            key={s}
            onClick={() => setSymptom(s)}
            style={{
              marginRight: '0.5rem',
              backgroundColor: symptom === s ? '#e0b0ff' : '#eee',
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <p>Selected symptom: {symptom}</p>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={handleSubmit}>Save Daily Info</button>
      </div>
    </div>
  );
}
