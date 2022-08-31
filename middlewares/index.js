const validatorParameters = require('../middlewares/validator-params');
const validatorJWT = require('../middlewares/validator-jwt');
const validatorRoles = require('../middlewares/validator-roles');
const validatorCategory = require('../middlewares/validator-category');

module.exports = {
    ...validatorParameters,
    ...validatorJWT,
    ...validatorRoles,
    ...validatorCategory
};