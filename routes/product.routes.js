const {Router} = require('express');
const { check } = require('express-validator');
const { getProduct, getProducts, creatProduct, updateProduct, deleteProduct } = require('../controllers/product.controllers');
const { productExistById, categoryExistByName } = require('../helpers/db-validators');

const { validatorJWT, validatorParameters, haveRoles, validatorCategory } = require('../middlewares');

const router = Router();

// Obtener todas las categorias - public
router.get('/', getProducts);

// Obtener category por id - public
router.get('/:id', [
    check('id', 'Id is not validator!').isMongoId(),
    check('id').custom(productExistById),
    validatorParameters
], getProduct);

// Crear una category - cualquier rol con token - private
router.post('/', [
    validatorJWT,
    check('name', 'Name is required').notEmpty(),
    check('price', 'Price is required').isFloat({min: 0}).not().isString(),
    check('available', 'Available is required').isBoolean(),
    check('description', 'Description is required').notEmpty(),
    check('nameCategory', 'NameCategory is required').notEmpty(),
    validatorCategory,
    validatorParameters
], creatProduct);

// Actualizar product - cualquier rol con token - private
router.put('/:id',[
    validatorJWT,
    check('id', 'Id is not validator!').isMongoId(),
    check('id').custom(productExistById),
    check('price', 'Price has to be number').optional().isFloat({min: 0}).not().isString(),
    check('available', 'Another value type is required').optional().isBoolean(),
    check('description', 'Desscription has to be string').optional().isString(),
    validatorParameters
], updateProduct);

// Borrar una category - solo role Admin - private
router.delete('/:id', [
    validatorJWT,
    haveRoles('ADMIN_ROLE'),
    check('id', 'Id is not validator!').isMongoId(),
    check('id').custom(productExistById),
    validatorParameters
], deleteProduct);


module.exports = router; 