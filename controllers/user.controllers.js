const {response, request} = require('express');

const getUser = (req = request, res = response) => {
    const {nombre = 'no hay nombre', promedio} = req.query;

    res.json({
        msg: 'get api - controller',
        nombre,
        promedio
    });
    
};

const putUser = (req, res = response) => {
    const {id_user} = req.params;

    res.json({
        msg: 'put api - controller',
        id_user
    });
}

const postUser = (req, res = response) => {
    const body = req.body;

    res.status(201).json({
        msg: 'post api - controller',
        body
    });
}

const deleteUser = (req, res = response) => {
    res.json({
        msg: 'delete api - controller'
    });
}


module.exports = {
    getUser, putUser, postUser, deleteUser          
}