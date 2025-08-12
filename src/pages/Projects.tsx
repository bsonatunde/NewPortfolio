import React, { useEffect, useState } from 'react';
const API_URL = process.env.REACT_APP_API_URL || '';
import { Project } from '../types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Link } from 'react-router-dom';

let Projects: React.FC = () => {
    let [projects, setProjects] = useState<Project[]>([]);
    let [title, setTitle] = useState('');
    let [description, setDescription] = useState('');
    let [link, setLink] = useState('');
    let [media, setMedia] = useState<File | null>(null);
    let [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Fetch projects from backend on mount
    useEffect(() => {
        let fetchProjects = async () => {
            try {
                let response = await fetch(`${API_URL}/api/projects`);
                let data = await response.json();
                console.log('Fetched projects:', data); // Debug log
                setProjects(data.reverse()); // Show latest first
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        let handleClickOutside = () => {
            setOpenDropdown(null);
        };
        
        if (openDropdown) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [openDropdown]);


    // Optionally, you can add a function to refresh projects after upload
    let refreshProjects = async () => {
        try {
            let response = await fetch(`${API_URL}/api/projects`);
            let data = await response.json();
            setProjects(data.reverse());
        } catch (error) {
            console.error('Error refreshing projects:', error);
        }
    };

    let handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !link) return;
        
        let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('link', link);
        if (media) formData.append('media', media);
        
        try {
            let response = await fetch(`${API_URL}/api/projects`, {
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

    // Delete project function
    let handleDelete = async (projectId: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                let response = await fetch(`${API_URL}/api/projects/${projectId}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    refreshProjects();
                } else {
                    console.error('Error deleting project');
                }
            } catch (error) {
                console.error('Delete error:', error);
            }
        }
        setOpenDropdown(null);
    };

    // Toggle dropdown menu
    let toggleDropdown = (projectId: string) => {
        setOpenDropdown(openDropdown === projectId ? null : projectId);
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
                        let getMediaUrl = (url?: string, projectId?: string) => {
                            if (!url) return '';
                            // Add project-specific cache-busting parameter
                            const cacheBuster = `?id=${projectId || 'default'}`;
                            return url + cacheBuster;
                        };
                        const isVideo = project.image && (project.image.endsWith('.mp4') || project.image.endsWith('.webm') || project.image.endsWith('.mov'));
                        const projectId = (project._id || project.id || idx).toString();
                        
                        return (
                            <div key={projectId} style={{ 
                                background: '#fff', 
                                borderRadius: 12, 
                                boxShadow: '0 2px 8px rgba(34,34,59,0.07)', 
                                padding: 20, 
                                display: 'flex', 
                                flexDirection: 'column',
                                position: 'relative'
                            }}>
                                {/* Three-dot menu */}
                                <div style={{ position: 'absolute', top: 15, right: 15 }}>
                                    <button 
                                        onClick={() => toggleDropdown(projectId)}
                                        style={{ 
                                            background: 'none', 
                                            border: 'none', 
                                            cursor: 'pointer', 
                                            fontSize: '20px',
                                            color: '#666',
                                            padding: '5px'
                                        }}
                                    >
                                        ⋮
                                    </button>
                                    {openDropdown === projectId && (
                                        <div 
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                                position: 'absolute',
                                                top: '100%',
                                                right: 0,
                                                background: '#fff',
                                                border: '1px solid #ddd',
                                                borderRadius: 8,
                                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                                zIndex: 10,
                                                minWidth: 120
                                            }}
                                        >
                                            <button
                                                onClick={() => {
                                                    // Handle edit - you can add edit functionality here
                                                    console.log('Edit project:', projectId);
                                                    setOpenDropdown(null);
                                                }}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 15px',
                                                    border: 'none',
                                                    background: 'none',
                                                    textAlign: 'left',
                                                    cursor: 'pointer',
                                                    borderBottom: '1px solid #eee'
                                                }}
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(projectId)}
                                                style={{
                                                    width: '100%',
                                                    padding: '10px 15px',
                                                    border: 'none',
                                                    background: 'none',
                                                    textAlign: 'left',
                                                    cursor: 'pointer',
                                                    color: '#e74c3c'
                                                }}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Media content */}
                                <div style={{ textAlign: 'center', marginBottom: 15 }}>
                                    {project.image ? (
                                        isVideo ? (
                                            <video controls style={{ width: '100%', maxWidth: 280, height: 160, objectFit: 'cover', borderRadius: 8 }}>
                                                <source src={getMediaUrl(project.image, projectId)} />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            <img 
                                                src={getMediaUrl(project.image, projectId)} 
                                                alt={project.title} 
                                                style={{ width: '100%', maxWidth: 280, height: 160, objectFit: 'cover', borderRadius: 8 }} 
                                                onError={(e) => {
                                                    console.error('Image failed to load:', project.image);
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                                onLoad={() => {
                                                    console.log('Image loaded successfully:', project.image);
                                                }}
                                            />
                                        )
                                    ) : (
                                        <div style={{ width: '100%', maxWidth: 280, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', borderRadius: 8, color: '#888', margin: '0 auto' }}>
                                            No media
                                        </div>
                                    )}
                                </div>

                                {/* Project details */}
                                <div style={{ flexGrow: 1, textAlign: 'center' }}>
                                    <h2 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', color: '#22223b' }}>{project.title}</h2>
                                    <p style={{ color: '#666', marginBottom: 20, fontSize: '0.95rem', lineHeight: 1.5 }}>{project.description}</p>
                                </div>

                                {/* View Project Button */}
                                <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                                    <a 
                                        href={project.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{ 
                                            display: 'inline-block',
                                            padding: '12px 24px',
                                            background: '#22223b',
                                            color: '#fff',
                                            textDecoration: 'none',
                                            borderRadius: 6,
                                            fontWeight: 600,
                                            fontSize: '0.95rem',
                                            transition: 'background 0.3s ease'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.background = '#1a1a2e'}
                                        onMouseOut={(e) => e.currentTarget.style.background = '#22223b'}
                                    >
                                        View Project →
                                    </a>
                                </div>
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