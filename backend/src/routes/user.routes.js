const express = require("express")
const {registerUser, loginUser, getUsers} = require("../controllers/users.controllers");
const { isAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/", isAuth, getUsers)

module.exports = router;