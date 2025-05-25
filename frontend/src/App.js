import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PartnerPreferences from './pages/PartnerPreferences';
import PeriodHaverPreferences from './pages/PeriodHaverPreferences';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser({ role: 'period-haver' }); // fallback for now
    }
  }, []);

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/preferences">Preferences</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/preferences"
          element={
            user?.role === 'partner' ? (
              <PartnerPreferences />
            ) : (
              <PeriodHaverPreferences />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
