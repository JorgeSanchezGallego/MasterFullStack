const mongoose = require("mongoose");

const connectBD = async() => {
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Conectado con éxito a la base de datos");
        
    } catch (error) {
        console.log("Error al conectar");
        
    }
    }

    module.exports = {connectBD}
