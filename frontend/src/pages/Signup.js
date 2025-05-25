import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'period-haver', // default
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    } else {
      alert(data.error || 'Signup failed');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Sign Up</h1>
      <input name="username" placeholder="Username" onChange={handleChange} /><br />
      <input name="email" placeholder="Email" onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br />
      <label>
        Role:
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="period-haver">Period Haver</option>
          <option value="partner">Partner</option>
        </select>
      </label><br />
      <button onClick={handleSubmit}>Create Account</button>
    </div>
  );
}
