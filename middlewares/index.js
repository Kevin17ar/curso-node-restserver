const validatorParameters = require('../middlewares/validator-params');
const validatorJWT = require('../middlewares/validator-jwt');
const validatorRoles = require('../middlewares/validator-roles');

module.exports = {
    ...validatorParameters,
    ...validatorJWT,
    ...validatorRoles
};