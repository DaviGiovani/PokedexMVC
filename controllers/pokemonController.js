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
