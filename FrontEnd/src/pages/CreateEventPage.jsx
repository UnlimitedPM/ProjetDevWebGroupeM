import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getCategories, getVenues, createEvent } from '../services/api';
import EventForm from '../components/EventForm';

const CreateEventPage = () => {
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, vens] = await Promise.all([
          getCategories(token),
          getVenues(token)
        ]);
        setCategories(cats);
        setVenues(vens);
      } catch (err) {
        setError('Impossible de charger les données pour le formulaire.');
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleCreateEvent = async (formData) => {
    setError('');
    try {
      await createEvent({ ...formData, is_public: true }, token);
      navigate('/'); // Redirection vers l'accueil après succès
    } catch (err) {
      setError('Erreur lors de la création de l\'événement.');
    }
  };

  return (
    <div style={{
      maxWidth: '700px',
      margin: '2rem auto',
      background: 'white',
      padding: '3rem',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>✨ Créer un nouvel événement</h2>
      {error && <p style={{ color: 'var(--danger-color)', background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>{error}</p>}
      <EventForm
        onSubmit={handleCreateEvent}
        initialData={{ categories, venues }}
        isEdit={false}
      />
    </div>
  );
};

export default CreateEventPage;
