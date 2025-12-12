// Importer les dépendances nécessaires
require('dotenv').config();
// On importe seulement notre objet de connexion pour l'instant
const db = require('./lib/db');

const seedDatabase = async () => {
  try {
    // 1. Établir la connexion et peupler db.connection
    await db.startDB();
    console.log('Database connected for seeding.');
    
    // 2. Maintenant que la connexion est prête, on peut importer les modèles
    const { User, Category, Venue, Event } = require('./models');

    // Forcer la synchronisation va supprimer les tables existantes et les recréer.
    // C'est utile pour repartir d'un état propre à chaque fois qu'on lance le seed.
    await db.connection.sync({ force: true });
    console.log('Database synced!');

    // --- Création des utilisateurs ---
    const adminUser = await User.create({
      name: 'Admin',
      age: 30,
      email: 'admin@example.com',
      password: 'Password123!', // Le hook s'occupera de hasher ça
      role: 'ADMIN',
    });

    const regularUser = await User.create({
      name: 'John Doe',
      age: 25,
      email: 'john.doe@example.com',
      password: 'Password123!',
      role: 'USER', // Le rôle par défaut est USER, mais c'est bien d'être explicite
    });
    console.log('Users created:', { adminUser: adminUser.name, regularUser: regularUser.name });

    // --- Création des catégories ---
    const categoryMusic = await Category.create({ name: 'Musique' });
    const categorySport = await Category.create({ name: 'Sport' });
    console.log('Categories created.');

    // --- Création des lieux ---
    const venueStadium = await Venue.create({ name: 'Grand Stade', address: '123 Rue du Stade' });
    const venueTheater = await Venue.create({ name: 'Théâtre de la Ville', address: '456 Avenue du Théâtre' });
    console.log('Venues created.');

    // --- Création des événements ---
    await Event.create({
      name: 'Concert de Rock',
      description: 'Un concert incroyable avec les meilleurs groupes du moment.',
      date: new Date('2025-10-15T20:00:00Z'),
      is_public: true,
      creatorId: adminUser.id,
      CategoryId: categoryMusic.id,
      VenueId: venueTheater.id,
    });

    await Event.create({
      name: 'Match de Football Final',
      description: 'La grande finale du championnat.',
      date: new Date('2025-11-01T15:00:00Z'),
      is_public: true,
      creatorId: adminUser.id,
      CategoryId: categorySport.id,
      VenueId: venueStadium.id,
    });
    console.log('Events created.');

    console.log('201');
  } catch (error) {
    console.error('400', error);
  } finally {
    // Fermer la connexion à la base de données
    if (db.connection) {
      await db.connection.close();
      console.log('Database connection closed.');
    }
  }
};

// Lancer le script
seedDatabase();
