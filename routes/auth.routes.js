const {Router} = require('express');
const { check } = require('express-validator');

const {login} = require('../controllers/auth.controllers');
const { validatorParameters } = require('../middlewares/validator-params');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(), 
    check('password', 'Password is required').notEmpty(),
    validatorParameters
],login);


module.exports = router;