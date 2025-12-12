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

// On pourra ajouter ici les autres fonctions : login, register, createEvent, etc.
