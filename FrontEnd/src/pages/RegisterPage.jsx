import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        age: parseInt(formData.age),
      });
      
      // Redirection vers la page de connexion après inscription réussie
      navigate('/login');
    } catch (err) {
      setError('Erreur lors de l\'inscription. Vérifiez vos informations.');
    }
  };

  return (
    <div style={{
      maxWidth: '440px',
      margin: '3rem auto',
      background: 'white',
      padding: '3rem',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-primary)' }}>Inscription</h2>
      {error && <p style={{ color: 'var(--danger-color)', background: '#fee2e2', padding: '0.75rem', borderRadius: '8px', textAlign: 'center', marginBottom: '1.5rem' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="votre@email.com"
          />
        </div>
        <div>
          <label htmlFor="age">Âge</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
            placeholder="25"
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
          S'inscrire
        </button>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
