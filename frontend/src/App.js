import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import PartnerPreferences from './pages/PartnerPreferences';
import PeriodHaverPreferences from './pages/PeriodHaverPreferences';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account';

function Navbar({ user, onLogout }) {
  return (
    <nav style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
      <Link to="/">Home</Link>
      <Link to="/preferences">Preferences</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
      <Link to="/account">Account</Link>
      {user && <button onClick={onLogout}>Log Out</button>}
    </nav>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload(); // reset UI and route
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/preferences"
          element={
            user?.role === 'partner'
              ? <PartnerPreferences />
              : <PeriodHaverPreferences />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
