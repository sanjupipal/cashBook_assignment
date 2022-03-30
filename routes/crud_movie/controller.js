let db = app.sequelize.models;
const { QueryTypes } = require("sequelize");

const create = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res
        .status(200)
        .json({ msg: "unsuccessful", error: "title is required" });
    }
    let data = { user_id: req.decoded.id, ...req.body };
    let movie = await db.movie.create(data);
    return res.status(200).json({ msg: "success", ...movie.dataValues });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", ...error });
  }
};
const update = async (req, res) => {
  try {
    const { movieId } = req.body;
    let data = { ...req.body };
    let movie = await db.movie.findOne({ where: { id: movieId } });
    if (!movie) {
      return res
        .status(200)
        .json({ msg: "unsuccessful", error: "invalid movie!" });
    }
    if (movie.dataValues.user_id !== req.decoded.id) {
      return res
        .status(200)
        .json({ msg: "unsuccessful", error: "invalid movie!" });
    }
    let newMovie = await db.movie.update(data, {
      where: { id: req.decoded.id },
    });
    return res.status(200).json({ msg: "success", ...newMovie });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", ...error });
  }
};
const remove = async (req, res) => {
  try {
    const { movieId } = req.body;
    let movie = await db.movie.findOne({ where: { id: movieId } });
    if (!movie) {
      return res
        .status(200)
        .json({ msg: "unsuccessful", error: "invalid movie!" });
    }
    if (movie.dataValues.user_id !== req.decoded.id) {
      return res
        .status(200)
        .json({ msg: "unsuccessful", error: "invalid movie!" });
    }
    let newMovie = await db.movie.destroy({
      where: { id: req.decoded.id },
    });
    return res.status(200).json({ msg: "success", ...newMovie });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", ...error });
  }
};
const list = async (req, res) => {
  try {
    let query = `select AVG(rating) as avg, m.id as movie, m.title , m.desc from movies as m 
      join ratings as r on m.id = r.movie_id group by m.id`;
    let data = await app.sequelize.query(query, { type: QueryTypes.SELECT });
    return res.status(200).json({ msg: "success", ...data });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", ...error });
  }
};

const addRating = async (req, res) => {
  try {
    const { movieId, rating } = req.body;
    if (!movieId || !rating) {
      return res
        .status(200)
        .json({ msg: "unsuccessful", error: "movie and rating required" });
    }
    if (rating < 0 || rating > 5)
      return res
        .status(200)
        .json({ msg: "unsuccessful", error: "rating should be between 0-5" });
    let haveRated = await db.ratings.findOne({
      where: { movie_id: movieId, user_id: req.decoded.id },
    });
    if (haveRated)
      return res
        .status(400)
        .json({ msg: "unsuccessful", error: "already rated" });
    let values = { user_id: req.decoded.id, movie_id: movieId, rating };
    let data = await db.ratings.create(values);
    return res.status(200).json({ msg: "success", ...data.dataValues });
  } catch (error) {
    return res.status(500).json({ msg: "Server Error", ...error });
  }
};

module.exports = {
  create,
  update,
  remove,
  list,
  addRating,
};
