import DataTable from './components/DataTable';import { useState, useEffect } from 'react';
import { getEvents } from './services/api';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Définition de la configuration des colonnes pour notre tableau
  const columns = [
    {
      Header: 'Nom de l\'événement',
      accessor: 'name', // Clé dans l'objet 'event'
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
        {
      Header: 'Date',
      accessor: 'date',
      // On utilise notre nouvelle fonction Cell pour formater la date
      Cell: ({ value }) => new Date(value).toLocaleDateString(),
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (error) {
        // L'erreur est déjà loggée dans le service, mais on pourrait
        // ajouter un état d'erreur ici pour l'afficher à l'utilisateur.
        console.error("Error in App component:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une fois, au montage.

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestion d'Événements</h1>
      </header>
      <main>
        <h2>Liste des Événements à Venir</h2>
                {loading ? (
          <p>Chargement des événements...</p>
        ) : (
          <DataTable data={events} columns={columns} />
        )}
      </main>
    </div>
  );
}

export default App;
