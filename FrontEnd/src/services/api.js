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
  const response = await fetch(`${API_URL}/login`, {
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

/**
 * Récupère toutes les catégories.
 * @param {string} token - Le token JWT pour l'authentification.
 * @returns {Promise<Array>}
 */
export const getCategories = async (token) => {
  const response = await fetch(`${API_URL}/categories`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch categories');
  return await response.json();
};

/**
 * Récupère tous les lieux.
 * @param {string} token - Le token JWT pour l'authentification.
 * @returns {Promise<Array>}
 */
export const getVenues = async (token) => {
  const response = await fetch(`${API_URL}/venues`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error('Failed to fetch venues');
  return await response.json();
};

/**
 * Crée un nouvel événement.
 * @param {Object} eventData - Les données de l'événement à créer.
 * @param {string} token - Le token JWT pour l'authentification.
 * @returns {Promise<Object>} L'événement nouvellement créé.
 */
export const createEvent = async (eventData, token) => {
  const response = await fetch(`${API_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) throw new Error('Failed to create event');
  return await response.json();
};

