const { Sequelize, DataTypes } = require("sequelize");
const ratings = {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true,
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    required: true,
  },
};
app.sequelize.define("ratings", ratings, {
  indexes: [
    {
      fields: ["user_id", "movie_id"],
    },
  ],
});
