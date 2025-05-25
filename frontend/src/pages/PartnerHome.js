import React, { useEffect, useState } from 'react';
import {
  StickyHeader,
  NavBar,
  MainContainer
} from '../components/SharedUI';
import { get_mood } from '../front_end_api/front_mood_api';
import { getCravings } from '../front_end_api/front_cravings_api';
import { getSymptoms } from '../front_end_api/front_symptoms_api';
import { getRecentPeriod } from '../front_end_api/front_period_api';

export default function PartnerHome() {
  const [mood, setMood] = useState('');
  const [cravings, setCravings] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [cycleDay, setCycleDay] = useState(null);
  const [phase, setPhase] = useState('');
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user || !user.partner) return;

    async function fetchData() {
      try {
        const [moodRes, cravingRes, symptomRes, periodRes] = await Promise.all([
          get_mood({ username: user.partner }),
          getCravings(user.partner),
          getSymptoms(user.partner),
          getRecentPeriod(user.partner)
        ]);

        setMood(moodRes.mood);
        setCravings(cravingRes.cravings);
        setSymptoms(symptomRes.symptoms);

        if (periodRes.period) {
          const startDate = new Date(periodRes.period);
          const today = new Date();
          const day = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) % 28 + 1;
          setCycleDay(day);
          setPhase(getPhase(day));
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [user]);

  const getPhase = (day) => {
    if (day <= 5) return 'Menstrual Phase';
    if (day <= 13) return 'Follicular Phase';
    if (day === 14) return 'Ovulation';
    return 'Luteal Phase';
  };

  return (
    <>
      <StickyHeader><NavBar isLoggedIn={!!user} /></StickyHeader>
      <MainContainer title="Your Partner's Info">
        {loading ? <p>Loading partner info...</p> : (
          <>
            <p><strong>Mood:</strong> {mood}</p>
            <p><strong>Cravings:</strong> {cravings}</p>
            <p><strong>Symptoms:</strong> {symptoms}</p>
            {cycleDay && <p><strong>Cycle Day:</strong> {cycleDay} ({phase})</p>}
          </>
        )}
      </MainContainer>
    </>
  );
}
