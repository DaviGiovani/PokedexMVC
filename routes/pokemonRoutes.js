const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.get('/search', pokemonController.searchPage);
router.get('/pokemon', pokemonController.getPokemon);
router.get('/pokemon/shiny', pokemonController.getShinyPokemon);
router.get('/compare', pokemonController.comparePokemon);

module.exports = router;
