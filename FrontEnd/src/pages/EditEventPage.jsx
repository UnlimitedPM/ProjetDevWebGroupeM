import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getCategories, getVenues, getEventById, updateEvent } from '../services/api';
import EventForm from '../components/EventForm';

const EditEventPage = () => {
  const [initialData, setInitialData] = useState(null);
  const [error, setError] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID de l'événement depuis l'URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Charger en parallèle l'événement, les catégories et les lieux
        const [event, cats, vens] = await Promise.all([
          getEventById(id),
          getCategories(token),
          getVenues(token)
        ]);

        setInitialData({
          ...event,
          categories: cats,
          venues: vens,
        });

      } catch (err) {
        setError('Impossible de charger les données pour le formulaire.');
      }
    };
    if (token) {
      fetchData();
    }
  }, [id, token]);

  const handleUpdateEvent = async (formData) => {
    setError('');
    try {
      await updateEvent(id, formData, token);
      navigate('/'); // Redirection après succès
    } catch (err) {
      setError('Erreur lors de la mise à jour de l\'événement.');
    }
  };

  if (!initialData) return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}><p>Chargement...</p></div>;

  return (
    <div style={{
      maxWidth: '700px',
      margin: '2rem auto',
      background: 'white',
      padding: '3rem',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>✏️ Modifier l'événement</h2>
      {error && <p style={{ color: 'var(--danger-color)', background: '#fee2e2', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>{error}</p>}
      <EventForm
        onSubmit={handleUpdateEvent}
        initialData={initialData}
        isEdit={true}
      />
    </div>
  );
};

export default EditEventPage;
