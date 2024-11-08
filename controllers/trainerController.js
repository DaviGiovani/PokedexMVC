const axios = require('axios');
const Trainer = require('../models/trainerModel');

async function registerTrainer(req, res) {
    console.log(req.body);
    try {
        const { name, team, height, weight, pokemon } = req.body;

        const pokemonList = pokemon.split(',');

        let pokemonDataList = [];

        for (let pokemonName of pokemonList) {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.trim().toLowerCase()}`);
            const pokemonData = {
                name: response.data.name,
                height: response.data.height / 10,
                weight: response.data.weight / 10,
                sprite: response.data.sprites.front_default
            };
            pokemonDataList.push(pokemonData);
        }

        const newTrainer = await Trainer.create({
            name,
            team,
            height,
            weight,
            party: pokemonDataList
        });

        res.redirect('/trainers');
    } 
    catch (error) {
        console.error(error);
        if (error.name === 'SequelizeValidationError') {
            res.status(400).send(error.errors[0].message);
        } else {
            res.status(500).send('Erro ao cadastrar treinador');
        }
    }
}

module.exports = {
    registerTrainer
};
