const { request, response } = require("express");
const { Category } = require("../models");


const validatorCategory = async(req = request, res = response, next) => {
    const nameCategory = req.body.nameCategory;

    const category = await Category.findOne({ name: nameCategory.toUpperCase() });

    if (!category) {
        return res.status(401).json({
            message: `the category ${nameCategory.toUpperCase()} not exist`
        })
    }

    if (!category.state) {
        return res.status(401).json({
            message:`the category ${nameCategory.toUpperCase()} not is active`
        });
    }

    req.categoryAuthenticate = category;
    next();
}


module.exports = {
    validatorCategory
};