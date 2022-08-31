const {Category, User, Role, Product} = require('../models');
const { response, request } = require("express");


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

//Verificar si la categorua existe
const categoryExistById = async(id) => {
    const category = await Category.findById(id);

    if ( !category ) {
        throw new Error(`Category ${id} not exist`);
    }
};

const categoryExistByName = async(nameCategory) => {
    const category = await Category.findOne({name: nameCategory.toUpperCase()});

    if ( !category ) {
        throw new Error(`Category ${nameCategory} not exist`);
    }
};

const productExistById = async(id) => {
    const product = await Product.findById(id);

    if ( !product ) {
        throw new Error(`Product ${id} not exist`);
    }
};

module.exports = {
    roleExist,
    emailExist,
    userExistById,
    categoryExistById,
    productExistById,
    categoryExistByName
};