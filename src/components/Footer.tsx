import React from 'react';

const Footer: React.FC = () => (
  <footer style={{
    width: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    background: '#22223b',
    color: '#fff',
    textAlign: 'center',
    padding: '24px 0 12px 0',
    fontSize: '1rem',
    boxShadow: '0 -2px 12px rgba(34,34,59,0.10)',
    zIndex: 1000
  }}>
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: 8 }}>
      <img src="/images/profile.jpeg" alt="Profile" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', marginBottom: 6, border: '2px solid #22223b' }} />
      <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Bolaji Onatunde</div>
    </div>
    <div style={{ color: '#c9ada7', fontSize: '0.95rem' }}>
        &copy; {new Date().getFullYear()} Bsonat Portfolio. All rights reserved.
    </div>
  </footer>
);

export default Footer;
