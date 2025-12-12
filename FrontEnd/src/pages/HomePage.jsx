import { useState, useEffect } from 'react';
import { getEvents } from '../services/api';
import DataTable from '../components/DataTable';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Définition de la configuration des colonnes pour notre tableau
  const columns = [
    {
      Header: 'Nom de l\'événement',
      accessor: 'name',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      Header: 'Catégorie',
      accessor: 'category.name', // On utilise l'accès imbriqué !
    },
     {
      Header: 'Lieu',
      accessor: 'venue.name',
    },
  ];

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
      {loading ? (
        <p>Chargement des événements...</p>
      ) : (
        <DataTable data={events} columns={columns} />
      )}
    </div>
  );
};

export default HomePage;
