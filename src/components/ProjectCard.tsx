
// MongoDB connection string example:
// mongodb+srv://portfolio:S9DJjht2HItwX1zm@cluster0.0pyecs9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// For security, use environment variables to store sensitive credentials.
import React from 'react';

const ProjectCard: React.FC<{
  title: string;
  description: string;
  image: string;
  link: string;
}> = ({ title, description, image, link }) => (
  <div style={{
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 8px rgba(34,34,59,0.07)',
    padding: 16,
    marginBottom: 24,
    display: 'flex',
    alignItems: 'center',
    gap: 20
  }}>
    <img src={image} alt={title} style={{ width: 100, height: 100, borderRadius: 8, objectFit: 'cover' }} />
    <div>
      <h3 style={{ margin: '0 0 8px 0' }}>{title}</h3>
      <p style={{ margin: 0 }}>{description}</p>
      <a href={link} style={{ color: '#4a4e69', textDecoration: 'underline', marginTop: 8, display: 'inline-block' }}>View Project</a>
    </div>
  </div>
);

export default ProjectCard;
