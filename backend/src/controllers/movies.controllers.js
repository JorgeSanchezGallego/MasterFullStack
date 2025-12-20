const Movie = require("../models/movie.model")

const {deleteImgCloudinary} = require("../utils/cloudinary.utils")

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
        const movie = new Movie(req.body)
        if (req.file) {
            movie.img = req.file.path;
        }
        const movieDB = await movie.save();
        return res.status(201).json(movieDB)
    } catch (err) {
        if (req.file?.filename) await deleteImgCloudinary(req.file.filename);
        return res.status(400).json({error: "Error al cargar la pelicula", detalles: err.message})
    }
}


const updateMovie = async (req, res) => {
    try {
        const { id } = req.params
        const prev = await Movie.findById(id)
        if (!prev) return res.status(404).json({error: "Pelicula no encontrada"})

        const updates = {...req.body};
        let newImgId = null;
        if (req.file){
            updates.imgUrl = req.file.path
            updates.imgId = req.file.filename
            newImgId = req.file.filename
        }
        const updated = await Movie.findByIdAndUpdate(id, updates,{
            runValidators: true
        })

        if (newImgId && prev.imgId){
            await deleteImgCloudinary(prev.imgId)
        }
        return res.status(200).json(updated)
        
    } catch (err) {
        if(req.file?.filename) await deleteImgCloudinary(req.file.filename)
        return res.status(400).json({ error: "Error actualizando la pelicula", detalles: err.message})
    }
}


const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Movie.findByIdAndDelete(id)
        if (!deleted) return res.status(404).json({error: "Pelicula no encontrada"})
        deleteImgCloudinary(deleted.img)
        return res.status(200).json({mensaje: "Pelicula eliminada correctamente", elemento: deleted})
    } catch (err) {
        return res.status(400).json({error: "Error eliminando pelicula" , detalles: err.message})
    }
}


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