const express = require("express");
const router = express.Router();

const {createMovie, getMovies, getMovieById, updateMovie, deleteMovie} = require("../controllers/movieController");

router.post("/", createMovie);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.patch("/:id", updateMovie);
router.delete("/:id", deleteMovie);



module.exports = router;