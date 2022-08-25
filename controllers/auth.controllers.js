const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");
const { generateJwt } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async(req = request, res = response) => {
    const {id_token} = req.body;

    try {

        const {name, email, img} = await googleVerify(id_token);
        
        let user = await User.findOne({email: email});

        // Si el user no existe en la DB
        if(!user) {
            //Crear User
            const data = {
                name,
                email,
                img,
                password: '1234567',
                google: true
            };

            user = new User(data);
            await user.save();
        }
        // Si el user existe en DB
        if(!user.state){
            return res.status(401).json({
                message: "usuario bloqueado"
            });
        }

        // Generar JWT (token)
        const token = await generateJwt(user._id);

        return res.json({
            message: "Login successful",
            user,
            token
        });

    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "id_token is not validator"
        })    
    }
    
};


module.exports = {
    login,
    googleSignIn
};