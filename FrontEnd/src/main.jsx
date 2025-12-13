import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import './index.css';
import App from './App.jsx';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateEventPage from './pages/CreateEventPage';
import EditEventPage from './pages/EditEventPage';
import ProtectedRoute from './components/ProtectedRoute';
import CategoriesPage from './pages/categoriesPage.jsx';
import VenuesPage from './pages/VenuesPage.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App devient notre layout principal
    // errorElement: <ErrorPage />, // On pourra ajouter une page d'erreur plus tard
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },

      {
  path: '/categories',
  element: <CategoriesPage />,
},
{
  path: '/venues',
  element: <VenuesPage />,
},

      // --- Routes Protégées pour les Admins ---
      {
        element: <ProtectedRoute />,
        children: [
                    {
            path: '/admin/create-event',
            element: <CreateEventPage />,
          },
          {
            path: '/admin/edit-event/:id',
            element: <EditEventPage />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
