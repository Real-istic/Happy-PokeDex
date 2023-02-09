let currentPokemon;



async function loadPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/charmander`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('loadedPokemon =', currentPokemon)

    renderCharmander()
}

function renderCharmander() {
    let PokeName = currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1);
    let PokeElement = currentPokemon.types[0].type.name.charAt(0).toUpperCase() + currentPokemon.types[0].type.name.slice(1)
    let PokeImage = currentPokemon.sprites.other['official-artwork'].front_default;
    let PokeDex = document.getElementById('pokedex');
    PokeDex.innerHTML +=/*html*/ `
        <div id="pokeMon">
            <h1 id="pokemonName"><img class="poke-ball-name" src="img/Pokeball.png" alt="">${PokeName}</h1>
            <div class="elements">
            <span>${PokeElement}</span>
            <span></span>
            <span></span>
            </div>
            <img class="poke-ball-background-2" src="img/pokeballbackground2.png" alt="">
            <img class="poke-ball-background" src="img/Pokeballbackground.svg" alt="">
            <img id="pokemonImage" src="${PokeImage}" alt="">
            <div class="info-container">      
            </div>
        </div>
    `;
}

