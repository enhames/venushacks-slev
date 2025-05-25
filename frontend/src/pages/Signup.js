import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../front_end_api/front_register_api';

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
    <div style={{ padding: '2rem' }}>
      <h1>Sign Up</h1>
      <input name="username" placeholder="Username" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <label>
        I have periods:
        <input
          type="checkbox"
          name="has_periods"
          checked={form.has_periods}
          onChange={handleChange}
        />
      </label><br />
      <button onClick={handleSubmit}>Create Account</button>
    </div>
  );
}
