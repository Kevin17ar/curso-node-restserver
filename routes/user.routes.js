const {Router} = require('express');

const {getUser, putUser, postUser, deleteUser} = require('../controllers/user.controllers');

const router = Router();

router.get('/api_hi', getUser);

router.put('/api_hi/:id_user', putUser);

router.post('/api_hi', postUser);

router.delete('/api_hi', deleteUser);



module.exports = router;