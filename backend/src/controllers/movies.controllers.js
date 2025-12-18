const Movie = require("../models/movie.model")

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({error: "Error al obtener las peliculas"});
    }
};

const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if(!movie){
            return res.status(404).json({Error: "Pelicula no encontrada"})
        }
        res.status(200).json(movie)
    } catch (err) {
        res.status(400).json({error: "Id invalido o error en la busqueda"})
    }
}


const createMovie = async (req, res) => {
    try{
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
    } catch (err) {
        res.status(400).json({error: "Error al cargar la pelicula", detalles: err.message})
    }
}


const updateMovie = async (req, res) => {
    try {
        const update = await Movie.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
        if (!update) {
            return res.status(404).json({error: "Pelicula no encontrada"})
        }
        res.status(200).json(update);
    } catch (err) {
        res.status(400).json({error: "Error al actualizar la pelicula", detalles: err.message})
    }
}


const deleteMovie = async (req, res) => {
    try {
        const deleted = await Movie.findByIdAndDelete(req.params.id);
        if (!deleted){
            return res.status(404).json({Error: "Pelicula no encontrada"})
        }
        res.status(200).json({mensaje:"Pelicula eliminada correctamente"})
    } catch (err) {
        res.status(400).json({
            error: "Error al eliminar la pelicula", detalles: err.message,
        });
    }
};


const searchMoviesByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) return res.status(400).json({Error: "Debes indicar ?title="});
        const movies = await Movie.find({title: new RegExp(title, "i")});
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({error: "Error al buscar peliculas", detalles: err.message})
    }
} 


const getMoviesByGenre = async (req, res) => {
    try {
        const {genre} = req.params
        const movies = await Movie.find({ genre })
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({error: "Error al filtrar por genero", detalles: err.message})
    }
}


const getTopRatedMovies = async (req, res) => {
    try {
        const movies = await Movie.find().sort({ rating: -1}).limit(5);
        res.status(200).json(movies)
    } catch (err) {
        res.status(500).json({error: "Error al obtener las mejores valoradas", detalles: err.message})
    }
}


const getRandomMovie = async (req, res) => {
    try {
        const total = await Movie.countDocuments();
        if (total === 0) return res.status(404).json({error: "No hay peliculas disponibles"});
        const randomIndex = Math.floor(Math.random()* total)
        const movie = await Movie.findOne().skip(randomIndex);
        res.status(200).json(movie)
    } catch (err) {
        res.status(500).json({error: "Error al obtener pelicula aleatoria", detalles : err.message})
    }
}


const bulkCreateMovies = async (req, res) => {
    try {
        const movies = req.body;
        if (!Array.isArray(movies) || movies.length === 0) {
            res.status(400).json({error: "Debes enviar un array de peliculas"})
        }
        const inserted = await Movie.insertMany(movies)
        res.status(201).json({cantidad: inserted.length, peliculas: inserted})
    } catch (err) {
        res.status(400).json({error: "Error al insertar varias peliculas", detalles: err.message})
    }
}

module.exports = {getMovies, getMovieById, createMovie, updateMovie, deleteMovie, searchMoviesByTitle, getMoviesByGenre, getTopRatedMovies, getRandomMovie, bulkCreateMovies};