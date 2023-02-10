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
            <h1 class="pokemonName"><img class="poke-ball-name" src="img/Pokeball.png" alt="">${PokeName}</h1>
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
        <span> <img src="img/Pokeball.png" alt=""> ${element}</span>
        `;
  }
}

async function loadPokemonSpecies() {
  let url = `https://pokeapi.co/api/v2/pokemon-species/${currentPokemon}`;
  let response = await fetch(url);
  pokemonSpecies = await response.json();
}

function insertInfoContainer(i) {
  document.getElementById('info-container' + i).innerHTML +=/*html*/ `
<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button onclick="activateTab(${i})" class="nav-link nav-link-${i} active" id="aboutTab${i}" data-bs-toggle="tab" data-bs-target="#about-tab-pane${i}" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">About</button>
  </li>
  <li class="nav-item" role="presentation">
    <button onclick="activateTab(${i})" class="nav-link nav-link-${i}" id="statsTab${i}" data-bs-toggle="tab" data-bs-target="#stats-tab-pane${i}" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Stats</button>
  </li>
  <li class="nav-item" role="presentation">
    <button onclick="activateTab(${i})" class="nav-link nav-link-${i}" id="evoTab${i}" data-bs-toggle="tab" data-bs-target="#evolution-tab-pane${i}" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Evolution</button>
  </li>
  <li class="nav-item" role="presentation">
    <button onclick="activateTab(${i})" class="nav-link nav-link-${i}" id="movesTab${i}" data-bs-toggle="tab" data-bs-target="#moves-tab-pane${i}" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Moves</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane tab-pane-${i} fade show active" id="about-tab-pane${i}" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
  About in here
  </div>
  <div class="tab-pane tab-pane-${i} fade" id="stats-tab-pane${i}" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
  stats
</div>
  <div class="tab-pane tab-pane-${i} fade" id="evolution-tab-pane${i}" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
  Evolution in here
</div>
  <div class="tab-pane tab-pane-${i} fade" id="moves-tab-pane${i}" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
  Moves in here
</div>
</div>
`;
insertStats(i)
}

function activateTab(i) {
  let clickedTab = event.srcElement || event.target;
  let tabs = document.querySelectorAll('.nav-link-' + i);
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });
  clickedTab.classList.add('active');

  let divs = document.querySelectorAll('.tab-pane-' + i);
  divs.forEach(div => {
    div.classList.remove('show', 'active');
  });
  document.querySelector(clickedTab.dataset.bsTarget).classList.add('show', 'active');
}

/* -------------- chart ------------- */

function insertStats(i) {
  let statsTab = document.getElementById('stats-tab-pane' + i);
  statsTab.innerHTML =/*html*/ `
  <div class="chart-box">
      <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-hp" style="width: 25%">HP</div>
      </div>
      <div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-attack" style="width: 50%">ATK</div>
      </div>
      <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-defense" style="width: 75%">DEF</div>
      </div>
      <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-special-attack" style="width: 100%; padding-bottom: 3px;">S-ATK</div>
      </div> 
      <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-special-defense" style="width: 100%; padding-bottom: 3px;">S-DEF</div>
      </div> 
      <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-speed" style="width: 100%">SPD</div>
      </div> 
  </div>
  `;
}


