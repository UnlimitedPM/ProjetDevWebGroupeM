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
            <li>
  <Link to="/categories">Catégories</Link>
</li>
<li>
  <Link to="/venues">Lieux</Link>
</li>

            {isAuthenticated ? (
              <>
                {user.role === 'ADMIN' && (
                  <li>
                    <Link to="/admin/create-event">Créer un événement</Link>
                  </li>
                )}
                <li>
                  <span>Bonjour, {user.name} ({user.role})</span>
                </li>
                <li>
                  <button onClick={logout}>Déconnexion</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Connexion</Link>
                </li>
                <li>
                  <Link to="/register">Inscription</Link>
                </li>
              </>
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
