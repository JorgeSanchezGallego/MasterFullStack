const User = require("../models/user.model")

const registerUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const userExist = await User.findOne({ email: user.email})
        if (userExist){
            return res.status(400).json({error: "El usuario ya existe"})
        }
        const userDB = await user.save();
        res.status(201).json(userDB)
    } catch (err) {
        res.status(400).json({error: "Error al registrar el usuario", detalle: err.message})
    }
}

module.exports = {registerUser};