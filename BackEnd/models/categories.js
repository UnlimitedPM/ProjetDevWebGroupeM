const { DataTypes, Model } = require("sequelize");
const { connection } = require("../lib/db");

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: connection,
    tableName: "category",
    underscored: true,
  }
);

module.exports = Category;
