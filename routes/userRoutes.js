const express = require('express');
const router = express.Router()
const user = require('../controllers/userController')
const validation = require('../validation/users/user_validation')
const checkUserAuth = require('../middlewares/auth_middleware')

//Router level middleware 
router.use('/changepassword', checkUserAuth)


router.post("/login", validation.loginUserValidation, user.userLogin)
router.post("/register", validation.registerUserValidation, user.userSignup)
router.post("/changepassword", user.changePassword)

module.exports = router;