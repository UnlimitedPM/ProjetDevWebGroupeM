import { Outlet, Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import './App.css';

function App() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestion d'Événements</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <span>Bonjour, {user.name} ({user.role})</span>
                </li>
                <li>
                  <button onClick={logout}>Déconnexion</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Connexion</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>
        {/* Le contenu de la page actuelle sera rendu ici */}
        <Outlet />
      </main>
    </div>
  );
}

export default App;
