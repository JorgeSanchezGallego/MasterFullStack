const mongoose = require("mongoose")


const cinemaSchema = new mongoose.Schema(
    {
        adress: {type: String, required: true, trim: true},
        name: {type: String, required: true, trim: true},
        movies: [
            {
            type: mongoose.Types.ObjectId,
            ref:"Movie",
        },
    ],
    },
    {timestamps: true}
);

const Cinema = mongoose.model("Cinema", cinemaSchema);
module.exports = Cinema;