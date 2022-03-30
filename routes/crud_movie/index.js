require("../../model/movie");
require("../../model/ratings");
const router = require("express").Router();
const { authUser } = require("../auth/verify");

const { create, update, remove, list, addRating } = require("./controller");

router.post("/", authUser, create);
router.put("/", authUser, update);
router.delete("/", authUser, remove);
router.post("/rating", authUser, addRating);
router.get("/rating-list", authUser, list);

module.exports = router;
