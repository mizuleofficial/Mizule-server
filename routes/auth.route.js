const express = require('express')
const router = express.Router()

const { signUp, login, resetPassword, resetPasswordVerify, verifyEmail, loginWithGoogle } = require('../controllers/auth.controller')

router.route('/signup').post(signUp)
router.route('/signup/verify').post(verifyEmail)
router.route('/login').post(login)
router.route('/login-with-google').post(loginWithGoogle)
router.route('/reset-password').post(resetPassword)
router.route('/reset-password/verify').post(resetPasswordVerify)

module.exports = router 