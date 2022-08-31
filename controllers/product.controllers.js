const { response, request } = require("express");
const {Product, Category} = require("../models");


const getProducts = async(req = request, res = response) => {
    const {limit, since = 0} = req.query;

    const [products, total] = await Promise.all([
        await Product.find({state: true})
        .populate('user', 'name')
        .populate('category', 'name')
        .skip(since)
        .limit(limit),
        await Product.countDocuments({state: true}),
    ]);

    return res.json({
        message: "get all Products",
        products,
        total
    });
};

const getProduct = async(req = request, res = response) => {
    const {id} = req.params;
    const product = await Product.findById(id).populate('user', 'name').populate('category', 'name');

    return res.json({
        message: "get product by id",
        product
    });
};

const creatProduct = async(req = request, res = response) => {
    const {name, price, description, available} = req.body; 

    const productDB = await Product.findOne({ name: name.toUpperCase() });

    if (productDB) {
        return res.status(400).json({
            message: `The product ${productDB.name} already exists`
        });
    }

    console.log(req.categoryAuthenticate);

    // Generar la data para guardar el product
    const data = {
        name: name.toUpperCase(),
        price,
        description,
        available,
        user: req.userAuthenticated._id,
        category: req.categoryAuthenticate._id
    }

    console.log(data);

    const product = new Product(data);

    // Save to product
    await product.save();

    return res.status(201).json({
        message: "creat Product",
        product
    });
};

const updateProduct = async(req = request, res = response) => {
    const {id} = req.params;
    const {_id, state,... data} = req.body;
    
    
    data.user = req.userAuthenticated._id;
    
    if (data.name){
        data.name = data.name.toUpperCase();
    }
    if (data.nameCategory) {
        const category = await Category.findOne({name: data.nameCategory.toUpperCase()});
        if (!category) {
            return res.status(401).json({
                message: "cannot find category",
            });
        }
        if (!category.state) {
            return res.status(404).json({
                message: "Category not active",
            });
        }

        data.category = category._id;
    }

    const product = await Product.findByIdAndUpdate(id, data,{new: true});
    return res.json({
        message: "update product by id",
        product
    });
};

const deleteProduct = async(req = request, res = response) => {
    const {id} = req.params;

    const product = await Product.findByIdAndUpdate(id, {state: false}, {new: true});

    return res.json({
        message: "delete product by id",
        product
    });
};

module.exports = {
    getProducts,
    getProduct,
    creatProduct,
    updateProduct,
    deleteProduct
};
