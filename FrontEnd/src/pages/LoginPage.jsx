import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      navigate('/'); // Redirige vers la page d'accueil après une connexion réussie
    } else {
      setError('Email ou mot de passe incorrect.');
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
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-primary)' }}>Connexion</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {error && <p style={{ color: 'var(--danger-color)', background: '#fee2e2', padding: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>{error}</p>}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="votre@email.com"
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Se connecter</button>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Pas encore de compte ? <Link to="/register">S'inscrire</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
