import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
    const [amount, setAmount] = useState('');
    const [purpose, setPurpose] = useState('');
    const [period, setPeriod] = useState('');
    const [special, setSpecial] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    // Contact form state
    const [msgName, setMsgName] = useState('');
    const [msgEmail, setMsgEmail] = useState('');
    const [msgMessage, setMsgMessage] = useState('');
    const [msgSent, setMsgSent] = useState(false);

    // Send email via backend
    const [msgError, setMsgError] = useState('');
    const handleMsgSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMsgError('');
        try {
            const res = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: msgName, email: msgEmail, message: msgMessage })
            });
            if (res.ok) {
                setMsgSent(true);
                setMsgName('');
                setMsgEmail('');
                setMsgMessage('');
            } else {
                const data = await res.json();
                setMsgError(data.error || 'Failed to send message.');
            }
        } catch (err) {
            setMsgError('Failed to send message.');
        }
    };

    return (
        <main className="main-content" style={{ minHeight: 'calc(100vh - 120px)', maxWidth: 900, margin: '0 auto', padding: 24 }}>
            <Header
                title="Bsonat Portfolio"
                links={[
                    { name: 'Home', href: '/' },
                    { name: 'Projects', href: '/projects' },
                    { name: 'Contact', href: '/contact' }
                ]}
            />

         

            {/* Customer Message Form */}
            <section style={{ marginBottom: 48 }}>
                <h1>Contact Me</h1>
                {/* Hero Section from Home page for personal touch */}
                <div className="hero-animate" style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 32, flexWrap: 'wrap', marginTop: 24 }}>
                    <img
                        src="/images/profile.jpeg"
                        alt="Profile"
                        style={{ width: 140, height: 140, borderRadius: '50%', objectFit: 'cover', marginBottom: 16, border: '4px solid #22223b' }}
                    />
                    <div style={{ flex: 1, minWidth: 250 }}>
                        <h2 style={{ margin: 0, fontSize: '2.5rem', color: '#22223b' }}>Bolaji Onatunde</h2>
                        <h3 style={{ color: '#4a4e69', margin: '8px 0 16px 0' }}>Full Stack Developer</h3>
                        <p style={{ fontSize: '1.1rem', color: '#444' }}>
                            Welcome! I build modern, scalable web applications with a focus on clean code and great user experience. Let’s create something amazing together.
                        </p>
                        <div style={{ color: '#444', marginBottom: 6 }}>Lagos, Nigeria</div>
                        <div style={{ color: '#444', marginBottom: 6 }}>Phone: <a href="tel:+2348138873454" style={{ color: '#4a4e69', textDecoration: 'underline' }}>+234 813 887 3454</a></div>
                        <div style={{ color: '#444', marginBottom: 12 }}>Email: <a href="mailto: onatunde.samuel@gmail.com" style={{ color: '#4a4e69', textDecoration: 'underline' }}>onatunde.samuel@gmail.com</a></div>
                    </div>
                </div>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  {msgSent ? (
                      <div style={{ color: 'green', marginTop: 24 }}>
                          Thank you for your message! I will get back to you soon.
                      </div>
                  ) : (
                      <form onSubmit={handleMsgSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500, width: '100%' }}>
                          {msgError && <div style={{ color: 'red', marginBottom: 8 }}>{msgError}</div>}
                          <label>
                              Your Name
                              <input
                                  type="text"
                                  value={msgName}
                                  onChange={e => setMsgName(e.target.value)}
                                  required
                                  style={{ width: '100%', padding: 8, marginTop: 4 }}
                              />
                          </label>
                          <label>
                              Your Email
                              <input
                                  type="email"
                                  value={msgEmail}
                                  onChange={e => setMsgEmail(e.target.value)}
                                  required
                                  style={{ width: '100%', padding: 8, marginTop: 4 }}
                              />
                          </label>
                          <label>
                              Message
                              <textarea
                                  value={msgMessage}
                                  onChange={e => setMsgMessage(e.target.value)}
                                  rows={4}
                                  required
                                  placeholder="Type your message here..."
                                  style={{ width: '100%', padding: 8, marginTop: 4 }}
                              />
                          </label>
                          <button type="submit" style={{ padding: '10px 0', background: '#22223b', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600 }}>
                              Send Message
                          </button>
                      </form>
                  )}
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default Contact;
