const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const Trainer = require('../models/trainerModel'); 

router.get('/register', (req, res) => {
  res.render('trainerRegister');
});

router.post('/register', trainerController.registerTrainer);

router.get('/Trainers', async (req, res) => {
  const trainers = await Trainer.findAll();
  res.render('trainerList', { trainers });
});

module.exports = router;
