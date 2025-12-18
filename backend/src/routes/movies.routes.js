const express = require("express")
const {getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getMoviesByGenre,
  searchMoviesByTitle,
  getTopRatedMovies,
  getRandomMovie,
  bulkCreateMovies} = require("../controllers/movies.controllers")

  const router = express.Router();

  router.get("/search", searchMoviesByTitle)
  router.get("/genre/:genre", getMoviesByGenre)
  router.get("/top-rated", getTopRatedMovies)
  router.get("/random", getRandomMovie)
  router.post("/bulk", bulkCreateMovies)


  router.get("/", getMovies)
  router.post("/", createMovie)
  router.get("/:id", getMovieById)
  router.put("/:id", updateMovie)
  router.delete("/:id", deleteMovie)



  

  module.exports = router;