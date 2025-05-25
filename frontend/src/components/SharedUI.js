import React from 'react';

export function StickyHeader({ children }) {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        backgroundColor: '#B09CD3',
        padding: '1rem 0',
        zIndex: 1000,
        borderBottom: '1px solid #ccc',
      }}
    >
      <h1
        style={{
          fontFamily: 'DM Serif Display',
          color: '#574260',
          textAlign: 'center',
          marginBottom: '1rem',
          fontSize: '2.5rem'
        }}
      >
        sync’d
      </h1>
      {children}
    </div>
  );
}

export function NavBar() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5rem',
    margin: '1rem 0',
    flexWrap: 'wrap',
  };

  const buttonStyle = {
    backgroundColor: '#574260',
    color: '#fff',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    fontFamily: 'Outfit',
    fontSize: '16px',
    fontWeight: '500',
    textDecoration: 'none',
  };

  return (
    <div style={navStyle}>
      <a href="/" style={buttonStyle}>Home</a>
      <a href="/preferences" style={buttonStyle}>Preferences</a>
      <a href="/account" style={buttonStyle}>Account</a>
      <a href="/signup" style={buttonStyle}>Sign Up</a>
      <a href="/login" style={buttonStyle}>Login</a>
    </div>
  );
}

export function MainContainer({ title, children }) {
  return (
    <div
      style={{
        backgroundColor: '#B09CD3',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'Outfit',
        color: '#574260',
        textAlign: 'center',
      }}
    >
      {title && <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{title}</h2>}
      {children}
    </div>
  );
}

export function ActionButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#574260',
        color: '#fff',
        padding: '0.6rem 1.5rem',
        fontSize: '16px',
        fontFamily: 'Outfit',
        fontWeight: 'bold',
        borderRadius: '8px',
        marginTop: '2rem',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

export function InputBox({ value, onChange, placeholder, type = 'text', ...props }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: '0.6rem',
        borderRadius: '6px',
        fontFamily: 'Outfit',
        fontSize: '16px',
        width: '100%',
        maxWidth: '400px',
        marginBottom: '1rem',
      }}
      {...props}
    />
  );
}