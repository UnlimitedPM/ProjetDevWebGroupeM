const User = require("./users");
const Event = require("./events");
const Category = require("./categories");
const Venue = require("./venues");

// An event has one creator (User)
Event.belongsTo(User, {
  foreignKey: {
    name: "creatorId",
    allowNull: false,
  },
  as: "creator",
});
User.hasMany(Event, {
  foreignKey: {
    name: "creatorId",
    allowNull: false,
  },
  as: "events",
});

// An event has one category
Event.belongsTo(Category, {
  foreignKey: "categoryId", // Nom explicite de la clé
  as: "category",
});
Category.hasMany(Event, {
  foreignKey: "categoryId", // Nom explicite de la clé
  as: "events",
});

// An event has one venue
Event.belongsTo(Venue, {
  foreignKey: "venueId", // Nom explicite de la clé
  as: "venue",
});
Venue.hasMany(Event, {
  foreignKey: "venueId", // Nom explicite de la clé
  as: "events",
});

// Many-to-Many: Users can register to many events, events can have many participants
Event.belongsToMany(User, {
  through: "event_registration",
  as: "participants",
  foreignKey: "eventId",
});
User.belongsToMany(Event, {
  through: "event_registration",
  as: "registeredEvents",
  foreignKey: "userId",
});

module.exports = {
  User,
  Event,
  Category,
  Venue,
};
