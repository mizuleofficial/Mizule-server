const express = require('express')
const router = express.Router()

const { signUp, login, forgot, verifyEmail } = require('../controllers/auth.controller')

router.route('/signup').post(signUp)
router.route('/signup/verify').post(verifyEmail)
router.route('/login').post(login)
router.route('/forgot-password').post(forgot)

module.exports = router 