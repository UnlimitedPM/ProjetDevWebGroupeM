const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");

class Venue extends Model {}

Venue.init(
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    tableName: "venue",
    underscored: true,
  }
);

module.exports = Venue;
