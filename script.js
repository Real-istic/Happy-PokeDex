let currentPokemon;
let pokemonList;
let pokemonData;
let count;
let pokemonSpecies;


function onLoad() {
  setCount()
  iteratePokemonList()
}

async function setCount() {
  let url = `https://pokeapi.co/api/v2/pokemon/`;
  let response = await fetch(url);
  pokemonList = await response.json();
  count = pokemonList['count'];
}

async function iteratePokemonList() {
  let url = `https://pokeapi.co/api/v2/pokemon/`;
  let response = await fetch(url);
  pokemonList = await response.json();
  for (let i = 0; i < 20; i++) {
    currentPokemon = pokemonList.results[i].name;
    // console.log(pokemonList.results[i].name);
    await loadPokemon();
    await loadPokemonSpecies()
    renderPokemon(i);
    insertElements(i)
    insertInfoContainer(i)
  }
}

async function loadPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon/${currentPokemon}`;
  let response = await fetch(url);
  pokemonData = await response.json();
  // console.log('loadedPokemon =', pokemonData);
}


function renderPokemon(i) {
  let PokeName = pokemonSpecies.names[5].name.charAt(0).toUpperCase() + pokemonSpecies.names[5].name.slice(1);
  let PokeImage = pokemonData.sprites.other['official-artwork'].front_default;
  let PokeDex = document.getElementById('pokedex');
  PokeDex.innerHTML +=/*html*/ `
        <div onclick="" id="pokeMon${i}" class="pokeMon">
            <h1 class="pokemonName"><img class="poke-ball-name" src="img/bug.png" alt="">${PokeName}</h1>
            <div id="elements${i}" class="elements">
            </div>
            <img class="poke-ball-background" src="img/Pokeballbackground.svg" alt="">
            <img id="pokemonImage" src="${PokeImage}" alt="">
            <div class="info-container" id="info-container${i}"></div>
        </div>`
    ;
}

function insertElements(i) {
  for (let j = 0; j < pokemonData.types.length; j++) {
    const element = pokemonData.types[j].type.name.charAt(0).toUpperCase() + pokemonData.types[j].type.name.slice(1);
    // console.log('element is = ', pokemonData.types[j].type.name);
    document.getElementById('elements' + i).innerHTML +=/*html*/ `
        <span> <img src="img/bug.png" alt=""> ${element}</span>
        `;
  }
}

async function loadPokemonSpecies(){
  let url = `https://pokeapi.co/api/v2/pokemon-species/${currentPokemon}`;
  let response = await fetch(url);
  pokemonSpecies = await response.json();
}

function insertInfoContainer(i) {
  document.getElementById('info-container' + i).innerHTML +=/*html*/ `
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <p onclick="activateTab(${i})" id="aboutTab${i}" class="nav-link nav-link-${i} active" aria-current="page">About</p>
    </li>
    <li class="nav-item">
     <p onclick="activateTab(${i})" id="statsTab${i}" class="nav-link nav-link-${i}">Stats</p>
   </li>
    <li class="nav-item">
      <p onclick="activateTab(${i})" id="evoTab${i}" class="nav-link nav-link-${i}">Evolution</p>
    </li>
    <li class="nav-item">
      <p onclick="activateTab(${i})" id="movesTab${i}" class="nav-link nav-link-${i}">Moves</p>
    </li>
  </ul>`;
}

function activateTab(i) {
  let tabs = document.querySelectorAll('.nav-link-'+ i);
  tabs.forEach(tab => tab.classList.remove('active'));
  const target = event.target || event.srcElement;
  if (target.classList.contains('nav-link')) {
    target.classList.add('active');
  }
}

//let PokeName = pokemonSpecies.names[5].name