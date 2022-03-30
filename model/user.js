const { Sequelize, DataTypes } = require("sequelize");
const user = {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};
app.sequelize.define("user", user, {
  indexes: [
    {
      fields: ["email"],
    },
  ],
});
