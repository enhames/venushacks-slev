import React, { useEffect, useState } from 'react';
import {
  StickyHeader,
  NavBar,
  MainContainer
} from '../components/SharedUI';
import { send_mood } from '../front_end_api/front_mood_api';
import { setCravings } from '../front_end_api/front_cravings_api';
import { setSymptoms } from '../front_end_api/front_symptoms_api';
import { updatePeriod, getRecentPeriod } from '../front_end_api/front_period_api';

export default function PeriodHaverHome() {
  const [mood, setMood] = useState('');
  const [craving, setCraving] = useState('');
  const [symptom, setSymptom] = useState('');
  const [cycleDay, setCycleDay] = useState(null);
  const [phase, setPhase] = useState('');
  const [loadingCycle, setLoadingCycle] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || !user.username) return;
    getRecentPeriod(user.username)
      .then(data => {
        if (!data.period) return setLoadingCycle(false);
        const startDate = new Date(data.period);
        const today = new Date();
        const day = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) % 28 + 1;
        setCycleDay(day);
        setPhase(getPhase(day));
        setLoadingCycle(false);
      })
      .catch(err => {
        console.error("Failed to get recent period:", err);
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
    if (!user?.username) return alert("Please log in.");
    updatePeriod(user.username, new Date().toISOString())
      .then(() => {
        alert("Period start logged!");
        window.location.reload();
      })
      .catch(() => alert("Failed to log period."));
  };

  const updateMood = (emoji) => {
    if (!user) return alert("Log in to save mood!");
    setMood(emoji);
    send_mood({ username: user.username, mood: emoji }).catch(() => alert("Failed to save mood."));
  };

  const updateCraving = (emoji) => {
    if (!user) return alert("Log in to save craving!");
    setCraving(emoji);
    setCravings(user.username, emoji).catch(() => alert("Failed to save craving."));
  };

  const updateSymptom = (emoji) => {
    if (!user) return alert("Log in to save symptom!");
    setSymptom(emoji);
    setSymptoms(user.username, emoji).catch(() => alert("Failed to save symptom."));
  };

  const circleStyle = (selected) => ({
    width: '50px', height: '50px', borderRadius: '50%',
    backgroundColor: selected ? '#574260' : '#ddd',
    color: selected ? '#fff' : '#574260',
    border: selected ? '3px solid #fff' : 'none',
    fontSize: '22px', cursor: 'pointer'
  });

  return (
    <>
      <StickyHeader><NavBar isLoggedIn={!!user} /></StickyHeader>
      <MainContainer title={loadingCycle ? 'Loading Cycle Info...' : cycleDay ? `Cycle Day ${cycleDay}: ${phase}` : 'No period start logged yet'}>
        <button onClick={handleLogPeriodStart} style={{ backgroundColor: '#574260', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '8px', marginBottom: '2rem' }}>Log Period Start (Today)</button>

        <h3>How are you feeling today?</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          {['😭', '😢', '😐', '🙂', '🥰'].map(e => (
            <button key={e} style={circleStyle(mood === e)} onClick={() => updateMood(e)}>{e}</button>
          ))}
        </div>

        <h3 style={{ marginTop: '2rem' }}>Today’s cravings</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          {['🍫', '🍟', '🍦', '🍲', '🚫'].map(e => (
            <button key={e} style={circleStyle(craving === e)} onClick={() => updateCraving(e)}>{e}</button>
          ))}
        </div>

        <h3 style={{ marginTop: '2rem' }}>Today’s symptoms</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
          {['🤕', '😖', '🤢', '🥱', '💪'].map(e => (
            <button key={e} style={circleStyle(symptom === e)} onClick={() => updateSymptom(e)}>{e}</button>
          ))}
        </div>
      </MainContainer>
    </>
  );
}