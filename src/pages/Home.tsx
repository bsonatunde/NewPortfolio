import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';

const skills = [
  'JavaScript', 'TypeScript', 'React', 'Redux', 'Node.js', 'Express', 'HTML', 'CSS', 'Responsive Design'
];

const Home: React.FC = () => {
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
      {/* Hero Section */}
      <section className="hero-animate" style={{ display: 'flex', alignItems: 'center', gap: 32, marginBottom: 40, flexWrap: 'wrap', marginTop: 130 }}>
           <img
             src="/images/profile.jpeg"
             alt="Profile"
             style={{ width: 140, height: 140, borderRadius: '50%', objectFit: 'cover', marginBottom: 16, border: '4px solid #22223b' }}
           />
        <div style={{ flex: 1, minWidth: 250 }}>
          <h1 style={{ margin: 0, fontSize: '2.5rem', color: '#22223b' }}>Bolaji Onatunde</h1>
          <h3 style={{ color: '#4a4e69', margin: '8px 0 16px 0' }}>Full Stack Developer</h3>
          <p style={{ fontSize: '1.1rem', color: '#444' }}>
            Welcome! I build modern, scalable web applications with a focus on clean code and great user experience. Let’s create something amazing together.
          </p>
          <Link to="/contact" style={{
            display: 'inline-block',
            background: '#22223b',
            color: '#fff',
            padding: '12px 32px',
            borderRadius: 6,
            textDecoration: 'none',
            fontWeight: 600,
            marginTop: 18
          }}>Contact Me</Link>
        </div>
      </section>

      {/* About Section */}
      <section style={{ marginBottom: 40 }}>
        <h2>About Me</h2>
        <p style={{ maxWidth: 700 }}>
          I am a passionate developer with experience in building dynamic and responsive web applications. My skills include JavaScript, TypeScript, React, and more. I love creating user-friendly interfaces and solving complex problems. Always eager to learn new technologies and take on new challenges.
        </p>
      </section>


      {/* Skills Section */}
      <section className="skills-animate" style={{ marginBottom: 40 }}>
        <h2>Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {skills.map(skill => (
            <span key={skill} style={{
              background: '#f2e9e4',
              color: '#22223b',
              padding: '8px 18px',
              borderRadius: 20,
              fontWeight: 500,
              fontSize: '1rem',
              boxShadow: '0 1px 4px rgba(34,34,59,0.07)'
            }}>{skill}</span>
          ))}
        </div>
      </section>

      {/* What I Can Do Section */}
      <section style={{ marginBottom: 40 }}>
        <h2>What I Can Do</h2>
        <ul style={{ color: '#444', margin: 0, paddingLeft: 18, fontSize: '1rem' }}>
          <li>Build modern, responsive web applications with React, TypeScript, and Node.js</li>
          <li>Design and implement RESTful APIs and backend services</li>
          <li>Integrate databases (MongoDB, SQL) and authentication</li>
          <li>Develop user-friendly interfaces and dashboards</li>
          <li>Deploy and maintain web projects for scalability</li>
          <li>Collaborate and communicate effectively with clients and teams</li>
        </ul>
      </section>

      {/* Projects Section - fetch from backend */}
      <section className="project-animate" style={{ marginBottom: 40 }}>
        <h2>Projects</h2>
        {
          (() => {
            const [projects, setProjects] = useState([]);
            const [loading, setLoading] = useState(true);
            const [error, setError] = useState('');
            useEffect(() => {
              fetch('/api/projects')
                .then(res => res.json())
                .then(data => {
                  setProjects(data);
                  setLoading(false);
                })
                .catch(err => {
                  setError('Failed to load projects');
                  setLoading(false);
                });
            }, []);
            if (loading) return <p>Loading projects...</p>;
            if (error) return <p style={{ color: 'red' }}>{error}</p>;
            if (projects.length === 0) return <p>No projects found.</p>;
            return projects.map((project: any) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                description={project.description}
                image={project.image}
                link={project.link}
              />
            ));
          })()
        }
      </section>

      <Footer />
    </main>
  );
};

export default Home;

