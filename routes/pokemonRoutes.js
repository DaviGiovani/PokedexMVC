const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.get('/search', pokemonController.searchPage);
router.get('/pokemon', pokemonController.getPokemon);

module.exports = router;
