import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../front_end_api/front_login_api';
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
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
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
