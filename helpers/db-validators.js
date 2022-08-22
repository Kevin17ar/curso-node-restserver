const Role = require('../models/role')
const User = require('../models/user');

//Verifica si el role existe en la base de datos
const roleExist = async(role = '')=>{
    const existRole = await Role.findOne({role: role});

    if ( !existRole ) {
        throw new Error(`Role ${role} is not registered in the database`);
    }
};

//Verificar si el email existe
const emailExist = async(email) => {
    const user = await User.findOne({email: email});

    if (user) {
        throw new Error(`Email ${email} already registered`);
    }
};

//Verificar si el Usuario existe
const userExistById = async(id) => {
    const user = await User.findById(id);

    if ( !user ) {
        throw new Error(`User ${id} not exist`);
    }
};

module.exports = {
    roleExist,
    emailExist,
    userExistById
};