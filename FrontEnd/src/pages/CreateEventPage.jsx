import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getCategories, getVenues, createEvent } from '../services/api';

const CreateEventPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: new Date().toISOString().slice(0, 16), // Format YYYY-MM-DDTHH:mm
    categoryId: '',
    venueId: '',
  });
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState('');
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lancer les deux appels en parallèle et attendre qu'ils soient tous les deux terminés
        const [cats, vens] = await Promise.all([
          getCategories(token),
          getVenues(token)
        ]);
        
        setCategories(cats);
        setVenues(vens);

        // Mettre à jour le formulaire une seule fois avec les valeurs par défaut
        if (cats.length > 0 && vens.length > 0) {
          setFormData(prev => ({
            ...prev,
            categoryId: cats[0].id,
            venueId: vens[0].id
          }));
        }
      } catch (err) {
        setError('Impossible de charger les données pour le formulaire.');
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.categoryId || !formData.venueId) {
      setError('Veuillez sélectionner une catégorie et un lieu.');
      return;
    }
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
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom de l'événement:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="categoryId">Catégorie:</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="venueId">Lieu:</label>
          <select
            id="venueId"
            name="venueId"
            value={formData.venueId}
            onChange={handleChange}
            required
          >
            {venues.map(ven => (
              <option key={ven.id} value={ven.id}>{ven.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Créer l'événement</button>
      </form>
    </div>
  );
};

export default CreateEventPage;
