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
    <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ margin: 0 }}>🎉 Événements à Venir</h2>
        {isAdmin && (
          <Link to="/admin/create-event">
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>➕</span> Créer un événement
            </button>
          </Link>
        )}
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          <p>Chargement des événements...</p>
        </div>
      ) : events.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          <p>Aucun événement disponible pour le moment.</p>
        </div>
      ) : (
        <DataTable data={events} columns={columns} />
      )}
    </div>
  );
};

export default HomePage;
