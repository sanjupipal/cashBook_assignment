const router = require("express").Router();

const user = require("./user/index");
router.use("/user", user);

const movie = require("./crud_movie/index");
router.use("/movie", movie);

module.exports = router;
