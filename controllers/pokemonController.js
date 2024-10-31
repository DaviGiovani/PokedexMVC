const axios = require('axios');

exports.searchPage = (req, res) => {
  res.render('search');
};

exports.getPokemon = async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const pokemon = {
      name: response.data.name,
      number: response.data.id,
      types: response.data.types.map(typeInfo => typeInfo.type.name),
      abilities: response.data.abilities.map(abilityInfo => abilityInfo.ability.name),
      image: response.data.sprites.versions['generation-v']['black-white'].animated.front_default,
      height: response.data.height / 10,
      weight: response.data.weight / 10,
    };
    res.render('result', { pokemon });
  } catch (error) {
    res.render('search', { error: 'Pokémon não encontrado!' });
  }
};

exports.getShinyPokemon = async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const shinyPokemon = {
      name: response.data.name,
      number: response.data.id,
      types: response.data.types.map(typeInfo => typeInfo.type.name),
      abilities: response.data.abilities.map(abilityInfo => abilityInfo.ability.name),
      image: response.data.sprites.versions['generation-v']['black-white'].animated.front_shiny,
      height: response.data.height / 10,
      weight: response.data.weight / 10,
    };

    const pokemon = {
      name: response.data.name,
      number: response.data.id,
      types: response.data.types.map(typeInfo => typeInfo.type.name),
      abilities: response.data.abilities.map(abilityInfo => abilityInfo.ability.name),
      image: response.data.sprites.versions['generation-v']['black-white'].animated.front_default,
      height: response.data.height / 10,
      weight: response.data.weight / 10,
    };

    res.render('resultShiny', { shinyPokemon });
  } catch (error) {
    res.render('search', { error: 'Pokémon não encontrado!' });
  }
};

exports.comparePokemon = async (req, res) => {
  const { name1, name2 } = req.query;
  try {
    const [response1, response2] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${name1.toLowerCase()}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon/${name2.toLowerCase()}`)
    ]);

    const pokemon1 = {
      name: response1.data.name,
      number: response1.data.id,
      types: response1.data.types.map(typeInfo => typeInfo.type.name),
      abilities: response1.data.abilities.map(abilityInfo => abilityInfo.ability.name),
      stats: response1.data.stats.map(statInfo => ({
        name: statInfo.stat.name,
        value: statInfo.base_stat,
      })),
      image: response1.data.sprites.front_default,
    };

    const pokemon2 = {
      name: response2.data.name,
      number: response2.data.id,
      types: response2.data.types.map(typeInfo => typeInfo.type.name),
      abilities: response2.data.abilities.map(abilityInfo => abilityInfo.ability.name),
      stats: response2.data.stats.map(statInfo => ({
        name: statInfo.stat.name,
        value: statInfo.base_stat,
      })),
      image: response2.data.sprites.front_default,
    };

    res.render('compare', { pokemon1, pokemon2 });
  } catch (error) {
    res.render('search', { error: 'Pokémon não encontrado!' });
  }
};