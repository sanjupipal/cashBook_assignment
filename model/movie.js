const { Sequelize, DataTypes } = require("sequelize");
const movie = {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  desc: {
    type: DataTypes.STRING,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};
app.sequelize.define("movie", movie, {
  indexes: [
    {
      fields: ["title", "user_id"],
    },
  ],
});
