const express = require('express');
const router = express.Router()

const { errorHandler } = require('../utils/errorHandlers.util')

const { historyPost } = require('../controllers/zules.controller')
const { validateUser } = require('../middlewares/middlewares.util')

router.route('/history').post(validateUser, errorHandler(historyPost))

module.exports = router