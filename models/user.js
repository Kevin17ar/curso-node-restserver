const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'Se requiere un nombre']
    },
    email: {
        type: String,
        required: [true,'Se requiere un email'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//Sobreescribir el metodo .toJSON para personalizar el return
UserSchema.methods.toJSON = function () {
    const {_id, __v, password, ... user} = this.toObject();
    user.uid = _id;
    return user;
};

module.exports = model('User', UserSchema);