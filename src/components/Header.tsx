import React, { useState, useEffect } from 'react';

interface HeaderProps {
  title: string;
  links: { name: string; href: string }[];
}

const Header: React.FC<HeaderProps> = ({ title, links }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header style={{
        width: '100%',
        padding: isMobile ? '20px 0 16px 0' : '28px 0 18px 0',
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
            padding: isMobile ? '0 20px' : '0 48px',
            boxSizing: 'border-box',
            position: 'relative'
        }}>
            {/* Logo/Title */}
            <a href="/" style={{ 
                fontSize: isMobile ? '1.5rem' : '2rem', 
                fontWeight: 700, 
                letterSpacing: 1, 
                color: '#fff', 
                textDecoration: 'none', 
                transition: 'color 0.2s',
                zIndex: 1001
            }}
                onMouseOver={e => (e.currentTarget.style.color = '#c9ada7')}
                onMouseOut={e => (e.currentTarget.style.color = '#fff')}
            >
                {title}
            </a>

            {/* Desktop Navigation */}
            {!isMobile && (
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
            )}

            {/* Mobile Hamburger Menu Button */}
            {isMobile && (
                <button
                    onClick={toggleMobileMenu}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#fff',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '8px',
                        zIndex: 1001,
                        transition: 'color 0.2s'
                    }}
                    onMouseOver={e => (e.currentTarget.style.color = '#c9ada7')}
                    onMouseOut={e => (e.currentTarget.style.color = '#fff')}
                >
                    {isMobileMenuOpen ? '✕' : '☰'}
                </button>
            )}

            {/* Mobile Navigation Menu */}
            {isMobile && isMobileMenuOpen && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        background: 'linear-gradient(180deg, #22223b 0%, #4a4e69 100%)',
                        minWidth: '200px',
                        borderRadius: '0 0 12px 12px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                        zIndex: 1000,
                        animation: 'slideDown 0.3s ease-out'
                    }}
                >
                    <nav>
                        <ul style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: 0, 
                            margin: 0, 
                            padding: '12px 0', 
                            listStyle: 'none' 
                        }}>
                            {links.map((link, index) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href} 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        style={{
                                            display: 'block',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            fontWeight: 500,
                                            fontSize: '1rem',
                                            padding: '12px 24px',
                                            transition: 'all 0.2s',
                                            borderBottom: index < links.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
                                        }}
                                        onMouseOver={e => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                            e.currentTarget.style.color = '#c9ada7';
                                        }}
                                        onMouseOut={e => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.color = '#fff';
                                        }}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    </header>
  );
};

export default Header;