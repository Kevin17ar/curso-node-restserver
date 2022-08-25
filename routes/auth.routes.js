const {Router} = require('express');
const { check } = require('express-validator');

const {login, googleSignIn} = require('../controllers/auth.controllers');
const { validatorParameters } = require('../middlewares/validator-params');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(), 
    check('password', 'Password is required').notEmpty(),
    validatorParameters
],login);

router.post('/google', [
    check('id_token', 'Id token is required').notEmpty(),
    validatorParameters
],googleSignIn);


module.exports = router;