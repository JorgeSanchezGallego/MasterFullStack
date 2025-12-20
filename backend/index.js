require("dotenv").config();

const express = require("express");

const {connectBD} = require("./src/config/db")

const movieRoutes = require("./src/routes/movies.routes")
const cinemaRoutes = require("./src/routes/cinemas.routes")
const userRoutes = require("./src/routes/user.routes"); 
const { connectCloudinary } = require("./src/config/cloudinary");



const app = express();

connectBD();
connectCloudinary();


app.use(express.json());

app.use("/api/movies", movieRoutes)
app.use("/api/cinemas", cinemaRoutes )
app.use("/api/users", userRoutes)


app.use((req, res) => {
    return res.status(404).json("Route not found")
})

app.listen(3000, () => {
    console.log("http://localhost:3000");
})

