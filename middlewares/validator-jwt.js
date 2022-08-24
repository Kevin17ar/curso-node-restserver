const { request,response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const validatorJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token');

    // Verificar si el token existe
    if(!token) {
        return res.status(401).json({
            message: 'Token is not found',
        })
    }    

    try{
        const {uid} = jwt.verify(token, process.env.JWT_SECRET_PUBLIC);

        // Leer el usuario por id
        const userAuthenticated = await User.findById(uid);
        
        // Verificar si el usuario existe en la DB
        if(!userAuthenticated){
            return res.status(401).json({
                message: 'Token is not valid - user not found in DB', 
            });
        }

        // Verificar si el usuario esta activo
        if(!userAuthenticated.state){
            return res.status(401).json({
                message: 'Token is not valid - user with state false',
            });
        }

        // En la req se puede enviar variables a los otros middlewares o controllers (no se debe sobreescribir)
        req.userAuthenticated = userAuthenticated;
        next();

    } catch(err) {
        console.log(err);
        return res.status(401).json({
            message: 'Token not valid'
        });
    }
};


module.exports = {
    validatorJWT
};