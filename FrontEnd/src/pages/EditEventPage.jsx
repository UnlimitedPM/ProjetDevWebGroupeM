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

  if (!initialData) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Modifier l'événement</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <EventForm
        onSubmit={handleUpdateEvent}
        initialData={initialData}
        isEdit={true}
      />
    </div>
  );
};

export default EditEventPage;
