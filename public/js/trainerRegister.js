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

    // Função para exibir as sugestões
    function displaySuggestions(pokemons) {
        pokemonSuggestions.innerHTML = ''; // Limpa as sugestões anteriores
        pokemons.slice(0, 10).forEach(pokemon => { // Limita a 10 sugestões
            const li = document.createElement('li');
            li.textContent = pokemon.name;
            li.addEventListener('click', () => addPokemon(pokemon.name)); // Adiciona ao clicar
            pokemonSuggestions.appendChild(li);
        });
    }

    // Função para remover um Pokémon da lista
    function removePokemon(pokemonName) {
        selectedPokemons = selectedPokemons.filter(pokemon => pokemon.name !== pokemonName.toLowerCase());
        
        // Atualiza a lista visual e o campo oculto
        renderPokemonList();
    }

    // Função para renderizar a lista de Pokémons
    function renderPokemonList() {
        pokemonList.innerHTML = ''; // Limpa a lista

        selectedPokemons.forEach(pokemon => {
            const li = document.createElement('li');
            li.classList.add('pokemon-item');

            // Cria o elemento de imagem e nome
            li.innerHTML = `<img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon-image"> ${pokemon.name}`;

            // Cria o botão de remoção
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'X'; // Botão pequeno com "X"
            removeBtn.classList.add('remove-btn');
            removeBtn.addEventListener('click', () => removePokemon(pokemon.name));

            // Adiciona o botão de remoção ao item de lista
            li.appendChild(removeBtn);
            pokemonList.appendChild(li);
        });

        // Atualiza o campo oculto
        pokemonHiddenInput.value = selectedPokemons.map(pokemon => pokemon.name).join(',');
    }

    // Função para adicionar o Pokémon à lista selecionada
    async function addPokemon(pokemonName) {
        if (pokemonName && !selectedPokemons.some(p => p.name === pokemonName.toLowerCase()) && selectedPokemons.length < 6) {
            try {
                // Faz a requisição para obter dados do Pokémon
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
                
                if (!response.ok) {
                    alert('Pokémon não encontrado. Verifique o nome e tente novamente.');
                    return;
                }

                const pokemonData = await response.json();
                const pokemonImage = pokemonData.sprites.front_default;

                // Adiciona o Pokémon à lista de seleção com a imagem e o nome
                selectedPokemons.push({ name: pokemonName.toLowerCase(), image: pokemonImage });

                // Renderiza a lista com o novo Pokémon
                renderPokemonList();

                // Limpa o campo de entrada e as sugestões
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

    // Evento para buscar sugestões enquanto o usuário digita
    pokemonInput.addEventListener('input', () => {
        const query = pokemonInput.value.trim();
        if (query) {
            fetchPokemonSuggestions(query);
        } else {
            pokemonSuggestions.innerHTML = ''; // Limpa as sugestões se o campo estiver vazio
        }
    });

    // Evento para adicionar Pokémon ao clicar no botão
    addPokemonBtn.addEventListener('click', () => {
        addPokemon(pokemonInput.value.trim());
    });
});
