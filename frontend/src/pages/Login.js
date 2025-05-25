import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../front_end_api/front_login_api';
import { checkHasPeriods } from '../front_end_api/front_period_api';

import {
  StickyHeader,
  NavBar,
  MainContainer,
  InputBox,
  ActionButton
} from '../components/SharedUI';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const user = await userLogin(form);
      // Fetch fresh has_periods info from backend:
      const hasPeriods = await checkHasPeriods(user.username);
      user.has_periods = hasPeriods;  // overwrite to ensure correct value

      localStorage.setItem('user', JSON.stringify(user));
      
      if (user.has_periods) {
        navigate('/period-haver-home');
      } else {
        navigate('/partner-home');
      }
    } catch (err) {
      alert(err.message || "Login failed.");
    }
  };

  return (
    <>
      <StickyHeader><NavBar isLoggedIn={false} /></StickyHeader>
      <MainContainer title="Log In">
        <InputBox name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <InputBox name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <ActionButton onClick={handleSubmit} label="Log In" />
      </MainContainer>
    </>
  );
}
