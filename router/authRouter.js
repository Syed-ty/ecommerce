const express = require('express');
const router = express.Router();
const auth = require('../controller/auth')

const authentication= require('../middleware/authentication')


router.post('/register',auth.register)
router.post('/login',auth.login)
router.get('/get-user/:id',auth.getUserById)
router.get('/get-users',auth.getAllUserDetails)
router.put('/edit-user/:id',auth.UpdateUserDetails)
router.delete('/delete-user/:id',auth.DeleteUserdDetails)

module.exports = router;