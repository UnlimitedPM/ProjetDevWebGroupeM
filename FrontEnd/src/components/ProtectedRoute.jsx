import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Un composant pour protéger les routes qui nécessitent un rôle d'administrateur.
 * Si l'utilisateur est un admin, il rend le contenu de la route (via <Outlet />).
 * Sinon, il redirige vers la page de connexion.
 */
const ProtectedRoute = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    // Si l'utilisateur n'est pas admin, on le redirige.
    // L'option 'replace' évite de polluer l'historique de navigation.
    return <Navigate to="/login" replace />;
  }

  // Si l'utilisateur est admin, on affiche le contenu de la route imbriquée.
  return <Outlet />;
};

export default ProtectedRoute;
