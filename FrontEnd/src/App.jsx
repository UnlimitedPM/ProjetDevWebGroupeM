import { useState, useEffect } from 'react';
import { getEvents } from './services/api';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
          <ul>
            {events.length > 0 ? (
              events.map((event) => (
                <li key={event.id}>
                  <h3>{event.name}</h3>
                  <p>{event.description}</p>
                  <p>
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  </p>
                </li>
              ))
            ) : (
              <p>Aucun événement trouvé.</p>
            )}
          </ul>
        )}
      </main>
    </div>
  );
}

export default App;
