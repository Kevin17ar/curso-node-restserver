const { response, request } = require("express");
const Category = require("../models/category");


const getCategories = async(req = request, res = response) => {

    const [categories, total] = await Promise.all([
        await Category.find({state: true}).populate('user', 'name'),
        await Category.countDocuments({state: true}),
    ]);

    return res.json({
        message: "get all categories",
        categories,
        total
    });
};

const getCategory = async(req = request, res = response) => {
    const {id} = req.params;
    const category = await Category.findById(id).populate('user');

    return res.json({
        message: "get category by id",
        category
    });
};

const creatCategory = async(req = request, res = response) => {
    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne({ name });

    if (categoryDB) {
        return res.status(400).json({
            message: `THe category ${category.name} already exists`
        });
    }

    // Generar la data para guardar la category
    const data = {
        name,
        user: req.userAuthenticated._id
    }

    const category = new Category(data);

    // Save to category
    await category.save();

    return res.status(201).json({
        category
    });
};

const updateCategory = async(req = request, res = response) => {
    const {id} = req.params;
    const {_id, state,... resto} = req.body;
    
    const data = {
        name: resto.name.toUpperCase(),
        user: req.userAuthenticated._id
    }

    const category = await Category.findByIdAndUpdate(id, data,{new: true});
    return res.json({
        message: "put category by id",
        category
    });
};

const deleteCategory = async(req = request, res = response) => {
    const {id} = req.params;

    const category = await Category.findByIdAndUpdate(id, {state: false}, {new: true});

    return res.json({
        message: "delete category by id",
        category
    });
};

module.exports = {
    getCategories,
    getCategory,
    creatCategory,
    updateCategory,
    deleteCategory
};