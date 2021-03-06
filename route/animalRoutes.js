const express = require('express')
const router = express.Router()

const animalController = require('../controller/animalControllers')


router.post('/animal', animalController.create)

router.get('/animal/:id', animalController.findOne)

router.get('/animal', animalController.findAll)

router.put('/animal', animalController.update)

router.delete('/animal', animalController.delete)

module.exports = router 