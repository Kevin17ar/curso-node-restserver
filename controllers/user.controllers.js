const {response, request} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const getUser = async(req = request, res = response) => {
    //const {nombre = 'no hay nombre', promedio} = req.query;
    const {limit, since = 0} = req.query;
    
    // const userTotal = await User.countDocuments({state: true});
    // const users = await User.find({state: true})
    //     .skip(since)
    //     .limit(limit);

    const [users, userTotal] = await Promise.all([
        await User.find({state: true})
        .skip(since)
        .limit(limit),
        await User.countDocuments({state: true})
    ]);

    
    res.json({
        msg: 'get api - controller',
        userTotal,
        users
    });
    
};

const putUser = async(req, res = response) => {
    const {id} = req.params;
    const {_id, password, google, ...paramsBody} = req.body;

    console.log(paramsBody);
    //Verificar si existe usuario en DB
    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        paramsBody.password = bcryptjs.hashSync(password, salt);
    }

    console.log(paramsBody);
    const usuario = await User.findByIdAndUpdate(id, paramsBody, {new: true});
    console.log(usuario);
    res.json({
        msg: 'put api - controller',
        usuario
    });
}

const postUser = async(req, res = response) => {
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    //Encriptar el pass
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    //Save to DB
    await user.save();

    res.status(201).json({
        msg: 'post api - controller',
        user,
    });
}

const deleteUser = async(req, res = response) => {
    const {id} = req.params;

    //Fisicamente lo borramos
    //const user = await User.findByIdAndDelete(id);
    const user = await User.findByIdAndUpdate(id, {state: false}, {new: true});
    
    res.json({
        msg: 'delete api - controller',
        user
    });
}


module.exports = {
    getUser, putUser, postUser, deleteUser          
}