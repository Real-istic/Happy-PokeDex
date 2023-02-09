let currentPokemon;
let pokemonList;
let pokemonData;


async function iteratePokemonList() {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=40&limit=40`;
    let response = await fetch(url);
    pokemonList = await response.json();
    for (let i = 0; i < pokemonList.results.length; i++) {
        currentPokemon = pokemonList.results[i].name;
        console.log(pokemonList.results[i].name);
        loadPokemon(i);
    }
}

async function loadPokemon(i) {
    let url = `https://pokeapi.co/api/v2/pokemon/${currentPokemon}`;
    let response = await fetch(url);
    pokemonData = await response.json();
    console.log('loadedPokemon =', pokemonData);
    renderPokemon(i);
}


function renderPokemon(i) {
    let PokeName = pokemonData.species.name.charAt(0).toUpperCase() + pokemonData.species.name.slice(1);
    let PokeImage = pokemonData.sprites.other['official-artwork'].front_default;
    let PokeDex = document.getElementById('pokedex');
    PokeDex.innerHTML +=/*html*/ `
        <div class="pokeMon">
            <h1 class="pokemonName"><img class="poke-ball-name" src="img/Pokeball.png" alt="">${PokeName}</h1>
            <div id="elements${i}" class="elements">
            </div>
            <img class="poke-ball-background-2" src="img/pokeballbackground2.png" alt="">
            <img class="poke-ball-background" src="img/Pokeballbackground.svg" alt="">
            <img id="pokemonImage" src="${PokeImage}" alt="">
            <div class="info-container">      
            </div>
        </div>
    `
    insertElements(i)

    ;
}

function insertElements(i){
    for (let j = 0; j < pokemonData.types.length; j++) {
        const element = pokemonData.types[j].type.name;
        console.log('element is = ', pokemonData.types[j].type.name);
        document.getElementById('elements' + i).innerHTML +=/*html*/ `
        <span>${element}</span>
        `;
    }
}

