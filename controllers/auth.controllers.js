const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJwt } = require("../helpers/generateJWT");

const login = async(req = request, res = response) => {
    const {email, password} = req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({ email: email });
        if(!user){
            return res.status(400).json({ 
                message: "Email / password incorrect - email"
            });
        }
        // Verificar si el usuario esta activo
        if(!user.state){
            return res.status(400).json({ 
                message: "Email / password incorrect - state: false"
            });
        }
        // Verificar si el password es correcto
        const passValidator = bcryptjs.compareSync(password, user.password);
        if(!passValidator){
            return res.status(400).json({ 
                message: "Email / password incorrect - password"
            });
        }
        // Generar JWT (token)
        const token = await generateJwt(user._id);

        res.json({
            msg: "Login successful",
            user,
            token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error con el administradror" 
        });
    }


};

module.exports = {
    login,
};