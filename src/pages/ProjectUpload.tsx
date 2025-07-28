import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Project } from '../types';
import Footer from '../components/Footer';

const ProjectUpload: React.FC<{ onUpload: (project: Project) => void }> = ({ onUpload }) => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [link, setLink] = useState('');
    const [media, setMedia] = useState<File | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !link) return;
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('link', link);
        if (media) formData.append('media', media);
        await fetch('http://localhost:5000/api/projects', {
            method: 'POST',
            body: formData
        });
        setTitle('');
        setDescription('');
        setLink('');
        setMedia(null);
        alert('Project uploaded successfully!');
        history.push('/projects');
    };

    return (
        <main className="main-content" style={{ minHeight: 'calc(100vh - 120px)', maxWidth: 600, margin: '0 auto', padding: 24 }}>
            <h1>Upload New Project</h1>
            <form onSubmit={handleSubmit} style={{ background: '#f7f9fa', padding: 16, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input type="text" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} required style={{ padding: 8 }} />
                <textarea placeholder="Project Description" value={description} onChange={e => setDescription(e.target.value)} required style={{ padding: 8 }} />
                <input type="url" placeholder="Project Link" value={link} onChange={e => setLink(e.target.value)} required style={{ padding: 8 }} />
                <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={e => setMedia(e.target.files ? e.target.files[0] : null)}
                    style={{ display: 'block', marginBottom: 8, width: '100%', padding: 8 }}
                />
                <button type="submit" style={{ padding: '10px 0', background: '#22223b', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 600 }}>Upload</button>
            </form>
            <Footer />
        </main>
    );
};

export default ProjectUpload;
