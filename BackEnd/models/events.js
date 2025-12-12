const { DataTypes, Model } = require("sequelize");

const { connection } = require("../lib/db");

class Event extends Model {}

Event.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
        name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: connection,
    tableName: "event",
    underscored: true,
  }
);

Event.addHook("beforeUpdate", (event, { fields }) => {
  // We can add some logic here later if needed
});

module.exports = Event;
