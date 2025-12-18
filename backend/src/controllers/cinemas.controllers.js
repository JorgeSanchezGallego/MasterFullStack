const Cinema = require("../models/cinema.model")

const postCinema = async (req, res) => {
    try {
        const newCinema = new Cinema(req.body);
        const cinemaSaved = await newCinema.save();
        res.status(201).json(cinemaSaved)
    } catch (err) {
        res.status(400).json({error: "No se ha podido crear el cine"})
    }
}


const getCinema = async (req,res) => {
    try {
        const {id} = req.params
        const cinema = await Cinema.findById(id).populate("movies");
        res.status(200).json(cinema)
    } catch (err) {
        res.status(400).json({error: "No se ha podido obtener el cine"})
    }
}

module.exports = {postCinema, getCinema}