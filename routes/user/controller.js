let db = app.sequelize.models;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { QueryTypes } = require("sequelize");

const create = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Provide Both Email & Password" });
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    req.body.password = hash;
    let data = { ...req.body };
    let val = await db.user.create(data);
    return res.status(200).json({ msg: "success", ...val.dataValues });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", ...error });
  }
};
const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Provide Both Email & Password" });
    }
    let user = await db.user.findOne({ where: { email } });
    if (!user)
      return res
        .status(400)
        .json({ msg: "unsuccessful", error: "incorrect username/password" });
    let valid = bcrypt.compareSync(password, user.password);
    if (!valid)
      return res
        .status(400)
        .json({ msg: "unsuccessful", error: "incorrect username/password" });
    delete user.dataValues.password;
    let token = await jwt.sign(user.dataValues, process.env.token_secret, {
      expiresIn: "1h",
    });
    return res.status(200).json({ msg: "success", token });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", ...error });
  }
};
module.exports = {
  create,
  login,
};
