const { request, response } = require("express");



const isAdminRole = (req = request, res = response, next) => {
    const {role, name} = req.userAuthenticated;

    if(!req.userAuthenticated){
        return res.status(500).json({
            message: "Se quiere verificar el role sin validar el token primero"
        })
    }

    if(role !== "ADMIN_ROLE") {
        return res.status(401).json({
            message: `${name} is not a admin role`
        });
    }

    next();
};

const haveRoles = (...roles) =>{
    return (req = request, res = response, next) => {
        if(!req.userAuthenticated){
            return res.status(500).json({
                message: "Se quiere verificar el role sin validar el token primero"
            })
        }

        if(!roles.includes(req.userAuthenticated.role)){
            return res.status(401).json({
                message: `El servicio requiere un role de la lista ${roles}`
            });
        }

        next();
    };
}


module.exports = {
    isAdminRole,
    haveRoles
};