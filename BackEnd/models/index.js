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
  foreignKey: {
    allowNull: false,
  },
  as: "category",
});
Category.hasMany(Event, {
  foreignKey: {
    allowNull: false,
  },
  as: "events",
});

// An event has one venue
Event.belongsTo(Venue, {
  foreignKey: {
    allowNull: false,
  },
  as: "venue",
});
Venue.hasMany(Event, {
  foreignKey: {
    allowNull: false,
  },
  as: "events",
});

module.exports = {
  User,
  Event,
  Category,
  Venue,
};
