const express = require('express');
const router = express.Router()

const { validateUser } = require('../middlewares/middlewares.util')
const { getRandomZules, getParticularZule, feedZule, similarZules } = require('../controllers/fetchZule.controller')

router.route('/random').get(getRandomZules)
router.route('/particular/:id_zule').get(getParticularZule)
router.route('/:id_zuleSpot/:user_id/:id_zule').get(feedZule)
router.route('/random/similar').get(similarZules)

module.exports = router