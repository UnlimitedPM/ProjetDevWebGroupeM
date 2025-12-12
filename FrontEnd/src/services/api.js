const API_URL = "http://localhost:3000"; // L'URL de notre backend Express

/**
 * Récupère tous les événements depuis l'API.
 * @returns {Promise<Array>} Une promesse qui résout en un tableau d'événements.
 */
export const getEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/events`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch events:", error);
    // Pour une meilleure gestion, on pourrait renvoyer un objet d'erreur standardisé
    // ou laisser le composant appelant gérer l'erreur. Pour l'instant, on renvoie un tableau vide.
    return [];
  }
};

/**
 * Connecte un utilisateur.
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<Object>} Une promesse qui résout en un objet contenant le token.
 */
export const login = async (email, password) => {
  const response = await fetch(`${API__URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    // Gérer les erreurs de connexion (ex: 401 Unauthorized)
    throw new Error('Login failed');
  }

  return await response.json();
};

// On pourra ajouter ici les autres fonctions : register, createEvent, etc.
