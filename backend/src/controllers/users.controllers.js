const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const {generateToken} = require("../utils/token")

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


const loginUser = async (req, res) => {
    try{
        const { email, password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json("Contraseña o usuario incorrectos")
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword){
        return res.status(400).json("Contraseña o usuario incorrecto")
    }
    const token = generateToken(user._id, user.email)
    return res.status(200).json({token, user})
}
 catch(err) {
    return res.status(400).json("Error al login")
}
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users)
    } catch (err) {
        return res.status(400).json("error")
    }
}

module.exports = {registerUser, loginUser, getUsers};