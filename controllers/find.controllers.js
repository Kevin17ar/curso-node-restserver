const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { User, Category, Product } = require("../models");

const collectionPermitted = [
    'users',
    'categories',
    'products',
    'roles',
];


const find = (req, res = response) => {
    const { collection, termino } = req.params;

    if (!collectionPermitted.includes(collection)) {
        return res.status(400).json({
            message: 'Invalid collection'
        });
    }

    switch (collection) {
        case 'users':
            findUsers(termino, res);
            //findUsers(termino)
            break;
        case 'categories':
            findCategories(termino, res);
            break;
        case 'products':
            findProducts(termino, res);
            break;
        default:
            return res.status(500).json({
                message: 'Falta completar esta busqueda'
            });

    }

};

const findUsers = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid(termino);

    if (isMongoId) {
        let user = await User.findOne(termino);
        return res.json({ 
            results: user ? [user] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    let user = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{state: true}]
    });

    return res.json({ results: user ? [user] : [] });

};

const findProducts = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid(termino);

    if (isMongoId) {
        let product = await Product.findOne(termino).populate('category', 'name');
        return res.json({ 
            results: product ? [product] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    let user = await Product.find({name: regex, state: true}).populate('category', 'name');

    return res.json({ results: user ? [user] : [] });

};

const findCategories = async (termino = '', res = response) => {
    const isMongoId = ObjectId.isValid(termino);

    if (isMongoId) {
        let category = await Category.findOne(termino);
        return res.json({ 
            results: category ? [category] : []
        });
    }

    const regex = new RegExp(termino, 'i');
    let category = await Category.find(
        {name: regex, state: true}
    );

    return res.json({ results: category ? [category] : [] });
};

module.exports = {
    find
}