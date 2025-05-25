import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import PeriodHaverPreferences from './pages/PeriodHaverPreferences';
import PartnerPreferences from './pages/PartnerPreferences';
import PartnerHome from './pages/PartnerHome';
import PeriodHaverHome from './pages/PeriodHaverHome';
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
        <Route path="/partner-home" element={<PartnerHome />} />
        <Route path="/period-haver-home" element={<PeriodHaverHome />} />
      </Routes>
    </Router>
  );
}

export default App;
