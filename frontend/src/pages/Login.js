import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../front_end_api/front_login_api';

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
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (err) {
      alert(err.message || "Login failed.");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Log In</h1>
      <input name="username" placeholder="Username" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <button onClick={handleSubmit}>Log In</button>
    </div>
  );
}
