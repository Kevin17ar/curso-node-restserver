const {Router} = require('express');
const { check } = require('express-validator');

const {validatorParameters} = require('../middlewares/validator-params');
const {roleExist, emailExist, userExistById} = require('../helpers/db-validators');

const {getUser, putUser, postUser, deleteUser} = require('../controllers/user.controllers');
const e = require('express');
const role = require('../models/role');

const router = Router();

router.get('/api_hi', getUser);

router.put('/api_hi/:id',[
    check('id', 'Id is not validator!').isMongoId(),
    check('id').custom( userExistById ),
    check('role').custom( roleExist ),
    validatorParameters
], putUser);

router.post('/api_hi', [
    check('name', 'Name is required!').not().isEmpty().not().isEmail(),
    check('password', 'password not validator and more the 6 letters!').isLength({min: 6}),
    check('email', 'email not validator!').isEmail(),
    check('email').custom( emailExist ),
    //check('role', 'role not validator').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( roleExist ), // or (role) => isRoleValidated(role) es igual.
    validatorParameters
],postUser);

router.delete('/api_hi/:id', [
    check('id', 'Id is not validator!').isMongoId(),
    check('id').custom( userExistById ),
    validatorParameters
], deleteUser);



module.exports = router;