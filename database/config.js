const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN_ATLAS);

        console.log('Data Base Online connect');

    } catch (e){
        console.log(e);
        throw new Error('Error en la coneccion a la DB');
    }

}

module.exports = {
    dbConnection
}