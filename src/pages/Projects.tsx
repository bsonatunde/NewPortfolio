import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [media, setMedia] = useState<File | null>(null);

    // Fetch projects from backend on mount
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('/api/projects');
                const data = await response.json();
                console.log('Fetched projects:', data); // Debug log
                setProjects(data.reverse()); // Show latest first
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);


    // Optionally, you can add a function to refresh projects after upload
    const refreshProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            setProjects(data.reverse());
        } catch (error) {
            console.error('Error refreshing projects:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !link) return;
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('link', link);
        if (media) formData.append('media', media);
        
        try {
            const response = await fetch('/api/projects', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                setTitle('');
                setDescription('');
                setLink('');
                setMedia(null);
                refreshProjects(); // Refresh list after upload
            } else {
                console.error('Error uploading project');
            }
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    return (
        <div className="main-content" style={{ minHeight: 'calc(100vh - 120px)', maxWidth: 1100, margin: '0 auto', padding: 24 }}>
            <Header
                title="Bsonat Portfolio"
                links={[
                    { name: 'Home', href: '/' },
                    { name: 'Projects', href: '/projects' },
                    { name: 'Contact', href: '/contact' }
                ]}
            />
            <div className="projects">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <h1>My Projects</h1>
                    <Link to="/upload" style={{ padding: '10px 24px', background: '#22223b', color: '#fff', borderRadius: 4, textDecoration: 'none', fontWeight: 600 }}>Upload Project</Link>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
                    {projects.map((project, idx) => {
                        // Determine if the file is an image or video
                        const getMediaUrl = (url?: string) => {
                            if (!url) return '';
                            // Use relative URL for deployed version
                            return url;
                        };
                        const isVideo = project.image && (project.image.endsWith('.mp4') || project.image.endsWith('.webm') || project.image.endsWith('.mov'));
                        return (
                            <div key={project._id || project.id || idx} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(34,34,59,0.07)', padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {project.image ? (
                                    isVideo ? (
                                        <video controls style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }}>
                                            <source src={getMediaUrl(project.image)} />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : (
                                        <img src={getMediaUrl(project.image)} alt={project.title} style={{ width: 180, height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />
                                    )
                                ) : (
                                    <div style={{ width: 180, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#eee', borderRadius: 8, marginBottom: 12, color: '#888' }}>
                                        No image or video
                                    </div>
                                )}
                                <h2 style={{ margin: '8px 0' }}>{project.title}</h2>
                                <p style={{ color: '#444', marginBottom: 12 }}>{project.description}</p>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: '#4a4e69', textDecoration: 'underline', fontWeight: 500 }}>View Project</a>
                            </div>
                        );
                    })}
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Projects;