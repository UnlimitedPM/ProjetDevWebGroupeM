import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EventForm = ({ initialData = {}, onSubmit, isEdit = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
    date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
    categoryId: initialData.categoryId || '',
    venueId: initialData.venueId || '',
  });

  // On passera les catégories et lieux en props pour ne pas les recharger ici
  const { categories = [], venues = [] } = initialData;

  useEffect(() => {
    // Si on est en mode édition et que les données arrivent, on met à jour le formulaire
    if (isEdit && initialData.id) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        date: new Date(initialData.date).toISOString().slice(0, 16),
        categoryId: initialData.categoryId,
        venueId: initialData.venueId,
      });
    }
  }, [initialData, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <label htmlFor="name">Nom de l'événement</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          placeholder="Concert, conférence, atelier..."
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          required
          rows="5"
          placeholder="Décrivez votre événement..."
          style={{ resize: 'vertical', minHeight: '100px' }}
        />
      </div>
      <div>
        <label htmlFor="date">Date et heure</label>
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
        <label htmlFor="categoryId">Catégorie</label>
        <select id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange} required>
          <option value="" disabled>-- Sélectionnez une catégorie --</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="venueId">Lieu</label>
        <select id="venueId" name="venueId" value={formData.venueId} onChange={handleChange} required>
          <option value="" disabled>-- Sélectionnez un lieu --</option>
          {venues.map(ven => (
            <option key={ven.id} value={ven.id}>{ven.name}</option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="submit" style={{ flex: 1 }}>
          {isEdit ? "✔️ Mettre à jour" : "✨ Créer l'événement"}
        </button>
        <button 
          type="button" 
          onClick={() => navigate('/')} 
          style={{ 
            flex: 1,
            background: 'white',
            color: 'var(--text-secondary)',
            border: '2px solid var(--border-color)'
          }}
        >
          ❌ Annuler
        </button>
      </div>
    </form>
  );
};

export default EventForm;
