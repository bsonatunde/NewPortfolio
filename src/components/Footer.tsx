import React from 'react';

const Footer: React.FC = () => {
  return (
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
      <div style={{ margin: '10px 0' }}>
        <a href="https://www.linkedin.com/in/bolaji-onatunde-b42130100/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#c9ada7', fontSize: '30px', textDecoration: 'none', display: 'inline-block' }}>
          💼
        </a>
        <a href="https://github.com/bsonatunde" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#c9ada7', fontSize: '30px', textDecoration: 'none', display: 'inline-block' }}>
          🐙
        </a>
        <a href="https://www.behance.net/onatundesamuel" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#c9ada7', fontSize: '30px', textDecoration: 'none', display: 'inline-block' }}>
          🎨
        </a>
      </div>
      <div style={{ color: '#c9ada7', fontSize: '0.95rem' }}>
        &copy; {new Date().getFullYear()} Bsonat Portfolio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;