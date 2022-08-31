const {Schema, model} = require('mongoose');


const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true,
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

ProductSchema.methods.toJSON = function () {
    const {__v, ... data} = this.toObject();
    return data;
};

module.exports = model('Product', ProductSchema);