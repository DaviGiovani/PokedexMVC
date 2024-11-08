document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('search-input');
    const searchInput1 = document.getElementById('search-input1');
    const searchInput2 = document.getElementById('search-input2');
    const pokemonList = document.getElementById('pokemon-list');
    const pokemonList1 = document.getElementById('pokemon-list1');
    const pokemonList2 = document.getElementById('pokemon-list2');
    let allPokemons = []; 

    async function fetchPokemons() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
            const data = await response.json();
            allPokemons = data.results; 
        } catch (error) {
            console.error('Erro ao buscar Pokémon:', error);
        }
    }

    function filterPokemons(inputElement, listElement) {
        const query = inputElement.value.toLowerCase();

        if (query === '') {
            listElement.innerHTML = '';
            return;
        }

        listElement.innerHTML = ''; 
        const filteredPokemons = allPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().startsWith(query)
        );

        filteredPokemons.forEach(pokemon => {
            const li = document.createElement('li');
            li.textContent = pokemon.name;
            li.addEventListener('click', () => {
                inputElement.value = pokemon.name; 
                listElement.innerHTML = ''; 
            });
            listElement.appendChild(li);
        });
    }

    await fetchPokemons();

    searchInput.addEventListener('input', () => filterPokemons(searchInput, pokemonList));
    searchInput1.addEventListener('input', () => filterPokemons(searchInput1, pokemonList1));
    searchInput2.addEventListener('input', () => filterPokemons(searchInput2, pokemonList2));
});
