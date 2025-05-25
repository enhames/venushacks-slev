import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PeriodHaverPreferences from './pages/PeriodHaverPreferences';
import PartnerPreferences from './pages/PartnerPreferences';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preferences" element={<PeriodHaverPreferences />} />
        <Route path="/partner-preferences" element={<PartnerPreferences />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
