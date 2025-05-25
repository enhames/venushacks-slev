import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../front_end_api/front_register_api';
import {
  StickyHeader,
  NavBar,
  MainContainer,
  InputBox,
  ActionButton
} from '../components/SharedUI';

export default function Signup() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    has_periods: true,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setForm((prev) => ({ ...prev, [name]: fieldValue }));
  };

  const handleSubmit = async () => {
    try {
      const user = await register(form);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      alert(err.message || "Signup failed.");
    }
  };

  return (
    <>
      <StickyHeader><NavBar isLoggedIn={false} /></StickyHeader>
      <MainContainer title="Sign Up">
        <InputBox name="username" placeholder="Username" value={form.username} onChange={handleChange} />
        <InputBox name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <InputBox name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <label style={{ display: 'block', marginBottom: '1rem' }}>
          I have periods:
          <input
            type="checkbox"
            name="has_periods"
            checked={form.has_periods}
            onChange={handleChange}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
        <ActionButton onClick={handleSubmit} label="Create Account" />
      </MainContainer>
    </>
  );
}