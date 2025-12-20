const express = require("express")
const {upload} = require ("../middlewares/file")
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
  router.post("/", upload.single('img'),createMovie)
  router.get("/:id", getMovieById)
  router.put("/:id", upload.single('img'),updateMovie)
  router.delete("/:id", deleteMovie)



  

  module.exports = router;