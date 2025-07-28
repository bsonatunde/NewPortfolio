import React from 'react';

interface HeaderProps {
  title: string;
  links: { name: string; href: string }[];
}

const Header: React.FC<HeaderProps> = ({ title, links }) => {
  return (
    <header style={{
        width: '100%',
        padding: '28px 0 18px 0',
        background: 'linear-gradient(90deg, #22223b 0%, #4a4e69 50%, #9a8c98 100%)',
        color: '#fff',
        marginBottom: 32,
        boxShadow: '0 2px 12px rgba(34,34,59,0.10)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000
    }}>
        <div style={{
            width: '100vw',
            marginLeft: 'calc(50% - 50vw)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 48px',
            boxSizing: 'border-box',
            gap: 0
        }}>
            <a href="/" style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: 1, color: '#fff', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = '#c9ada7')}
                onMouseOut={e => (e.currentTarget.style.color = '#fff')}
            >
                {title}
            </a>
            <nav>
                <ul style={{ display: 'flex', gap: 40, margin: 0, padding: 0, listStyle: 'none' }}>
                    {links.map(link => (
                        <li key={link.name}>
                            <a href={link.href} style={{
                                color: '#fff',
                                textDecoration: 'none',
                                fontWeight: 500,
                                fontSize: '1.1rem',
                                letterSpacing: 0.5,
                                transition: 'color 0.2s',
                            }}
                            onMouseOver={e => (e.currentTarget.style.color = '#c9ada7')}
                            onMouseOut={e => (e.currentTarget.style.color = '#fff')}
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    </header>
  );
};

export default Header;