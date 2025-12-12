import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getEvents, deleteEvent } from '../services/api';
import DataTable from '../components/DataTable';

const HomePage = () => {
  const { isAdmin, token } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (eventId) => {
    // Demander une confirmation avant la suppression
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      try {
        await deleteEvent(eventId, token);
        // Mettre à jour la liste des événements en filtrant celui qui a été supprimé
        setEvents(events.filter(event => event.id !== eventId));
      } catch (error) {
        console.error('Failed to delete event:', error);
        // On pourrait afficher une notification d'erreur ici
      }
    }
  };

  const columns = useMemo(() => {
    const baseColumns = [
      { Header: 'Nom de l\'événement', accessor: 'name' },
      { Header: 'Description', accessor: 'description' },
      { Header: 'Date', accessor: 'date', Cell: ({ value }) => new Date(value).toLocaleDateString() },
      { Header: 'Catégorie', accessor: 'category.name' },
      { Header: 'Lieu', accessor: 'venue.name' },
    ];

    if (isAdmin) {
      baseColumns.push({
        Header: 'Actions',
        accessor: 'id',
        Cell: ({ value }) => (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to={`/admin/edit-event/${value}`}>Modifier</Link>
            <button onClick={() => handleDelete(value)}>Supprimer</button>
          </div>
        ),
      });
    }

    return baseColumns;
  }, [isAdmin, events]); // Ajouter 'events' aux dépendances pour que la fonction de suppression ait la bonne portée

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error in HomePage component:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Liste des Événements à Venir</h2>
      {isAdmin && (
        <div className="admin-actions" style={{ marginBottom: '20px' }}>
          <Link to="/admin/create-event">
            <button>Créer un nouvel événement</button>
          </Link>
        </div>
      )}
      {loading ? (
        <p>Chargement des événements...</p>
      ) : (
        <DataTable data={events} columns={columns} />
      )}
    </div>
  );
};

export default HomePage;
