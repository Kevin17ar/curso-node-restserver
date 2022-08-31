const {Router} = require('express');
const { check } = require('express-validator');
const { getCategories, getCategory, creatCategory, updateCategory, deleteCategory } = require('../controllers/category.controllers');
const { categoryExistById } = require('../helpers/db-validators');

const { validatorJWT, validatorParameters, haveRoles } = require('../middlewares');

const router = Router();

// Obtener todas las categorias - public
router.get('/', getCategories);

// Obtener category por id - public
router.get('/:id', [
    check('id', 'Id is not validator!').isMongoId(),
    check('id').custom(categoryExistById),
    validatorParameters
], getCategory);

// Crear una category - cualquier rol con token - private
router.post('/', [
    validatorJWT,
    check('name', 'Name is required').notEmpty(),
    validatorParameters
],creatCategory);

// Actualizar categori - cualquier rol con token - private
router.put('/:id',[
    validatorJWT,
    check('name', 'Name is required').notEmpty(),
    check('id', 'Id is not validator!').isMongoId(),
    check('id').custom(categoryExistById),
    validatorParameters
], updateCategory);

// Borrar una category - solo role Admin - private
router.delete('/:id', [
    validatorJWT,
    haveRoles('ADMIN_ROLE'),
    check('id', 'Id is not validator!').isMongoId(),
    check('id').custom(categoryExistById),
    validatorParameters
], deleteCategory);


module.exports = router; 