const { Router } = require('express');
const { check } = require('express-validator');

const { find } = require('../controllers/find.controllers');
const { validatorParameters } = require('../middlewares');


const router = Router();

router.get('/:collection/:termino',find);


module.exports = router;