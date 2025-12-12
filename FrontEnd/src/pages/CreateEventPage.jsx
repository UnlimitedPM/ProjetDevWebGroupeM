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
    <div>
      <h2>Créer un nouvel événement</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <EventForm
        onSubmit={handleCreateEvent}
        initialData={{ categories, venues }}
        isEdit={false}
      />
    </div>
  );
};

export default CreateEventPage;
