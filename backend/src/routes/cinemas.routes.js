const express = require("express")
const {postCinema, getCinema} = require("../controllers/cinemas.controllers")

const router = express.Router();

router.post("/", postCinema)
router.get("/:id", getCinema)

module.exports = router;