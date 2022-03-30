require("../../model/user");
const router = require("express").Router();

const { login, create } = require("./controller");

router.post("/login", login);
router.post("/", create);

module.exports = router;
