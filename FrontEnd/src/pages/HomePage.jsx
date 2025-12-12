import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getEvents } from '../services/api';
import DataTable from '../components/DataTable';

const HomePage = () => {
  const { isAdmin } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <Link to={`/admin/edit-event/${value}`}>Modifier</Link>
        ),
      });
    }

    return baseColumns;
  }, [isAdmin]);

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
