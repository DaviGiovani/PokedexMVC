document.addEventListener('DOMContentLoaded', () => {
    const pokemonInput = document.getElementById('pokemon-input');
    const addPokemonBtn = document.getElementById('add-pokemon-btn');
    const pokemonList = document.getElementById('pokemon-list');
    const pokemonHiddenInput = document.getElementById('pokemon-hidden-input');
    const pokemonSuggestions = document.getElementById('pokemon-suggestions');
    
    let selectedPokemons = [];

    // Função para buscar Pokémons conforme o usuário digita
    async function fetchPokemonSuggestions(query) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
            const data = await response.json();
            const filteredPokemons = data.results.filter(pokemon =>
                pokemon.name.toLowerCase().startsWith(query.toLowerCase())
            );
            displaySuggestions(filteredPokemons);
        } catch (error) {
            console.error('Erro ao buscar sugestões de Pokémon:', error);
        }
    }

    function displaySuggestions(pokemons) {
        pokemonSuggestions.innerHTML = ''; 
        pokemons.slice(0, 10).forEach(pokemon => {
            const li = document.createElement('li');
            li.textContent = pokemon.name;
            li.addEventListener('click', () => addPokemon(pokemon.name));
            pokemonSuggestions.appendChild(li);
        });
    }

    async function addPokemon(pokemonName) {
        if (pokemonName && !selectedPokemons.includes(pokemonName.toLowerCase()) && selectedPokemons.length < 6) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
                
                if (!response.ok) {
                    alert('Pokémon não encontrado. Verifique o nome e tente novamente.');
                    return;
                }

                const pokemonData = await response.json();
                const pokemonImage = pokemonData.sprites.front_default;

                selectedPokemons.push(pokemonName.toLowerCase());

                const li = document.createElement('li');
                li.innerHTML = `<img src="${pokemonImage}" alt="${pokemonName}" class="pokemon-image"> ${pokemonName}`;
                pokemonList.appendChild(li);

                pokemonHiddenInput.value = selectedPokemons.join(',');

                pokemonInput.value = '';
                pokemonSuggestions.innerHTML = '';
            } catch (error) {
                console.error('Erro ao buscar o Pokémon:', error);
                alert('Erro ao buscar o Pokémon. Verifique o nome e tente novamente.');
            }
        } else if (selectedPokemons.length >= 6) {
            alert('Você só pode adicionar até 6 Pokémons.');
        } else {
            alert('O Pokémon já foi adicionado ou o nome está vazio.');
        }
    }

    pokemonInput.addEventListener('input', () => {
        const query = pokemonInput.value.trim();
        if (query) {
            fetchPokemonSuggestions(query);
        } else {
            pokemonSuggestions.innerHTML = '';
        }
    });

    addPokemonBtn.addEventListener('click', () => {
        addPokemon(pokemonInput.value.trim());
    });
});
