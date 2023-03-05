const express = require('express')
const router = express.Router()

const { likePost, commentPost } = require('../controllers/zules.controller')
const { validateUser } = require('../middlewares/middlewares.util')
const { errorHandler } = require('../utils/errorHandlers.util')


router.route('/like').post(validateUser, errorHandler(likePost))
router.route('/comment').post(validateUser, errorHandler(commentPost))

module.exports = router