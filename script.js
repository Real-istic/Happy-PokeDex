let currentPokemon;
let pokemonList;
let pokemonData;
let count;
let pokemonSpecies;
let pokeImage;
let evolutionChain;

function onLoad() {
  // setCount()
  iteratePokemonList()
}

// async function setCount() {
//   let url = `https://pokeapi.co/api/v2/pokemon/`;
//   let response = await fetch(url);
//   pokemonList = await response.json();
//   count = pokemonList['count'];
//   console.log(count);
// }

async function iteratePokemonList() {
  let url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20/`;
  let response = await fetch(url);
  pokemonList = await response.json();
  for (let i = 0; i < 20; i++) {
    currentPokemon = pokemonList.results[i].name;
    await loadPokemon();
    await loadPokemonSpecies()
    renderPokemon(i);
    insertElements(i)
    insertInfoContainer(i)
    insertStats(i)
    insertAbout(i)
    insertMoves(i)
    await insertEvolution(i)
  }
}

async function loadEvolutionChain(url) {
  let response = await fetch(url);
  evolutionChain = await response.json();
}

async function loadPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon/${currentPokemon}`;
  let response = await fetch(url);
  pokemonData = await response.json();
}

function renderPokemon(i) {
  let PokeName = currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);
  pokeImage = pokemonData.sprites.other['official-artwork'].front_default;
  let PokeDex = document.getElementById('pokedex');
  PokeDex.innerHTML +=/*html*/ `
      <div onclick="" id="pokeMon${i}" class="pokeMon">
          <h2 class="pokemonName"><img class="poke-ball" src="img/animatedpokeball.gif" alt="">${PokeName}</h2>
          <div id="elements${i}" class="elements">
          </div>
          <img class="poke-ball-background" src="img/Pokeballbackground.svg" alt="">
          <img id="pokemonImage" src="${pokeImage}" alt="">
          <div class="info-container" id="info-container${i}"></div>
      </div>`;
}

function insertElements(i) {
  for (let j = 0; j < pokemonData.types.length; j++) {
    const element = pokemonData.types[j].type.name;
    let elementIcon = icons[element]
    document.getElementById('elements' + i).innerHTML +=/*html*/ `
        <span> <img class="${element}" src="${elementIcon}" alt=""> ${element.charAt(0).toUpperCase() + pokemonData.types[j].type.name.slice(1)}</span>
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
            <div class="tab-pane about-tab tab-pane-${i} fade show active" id="about-tab-pane${i}" role="tabpanel" tabindex="0">
            </div>
            <div class="tab-pane tab-pane-${i} fade" id="stats-tab-pane${i}" role="tabpanel" tabindex="0">
            </div>
            <div class="tab-pane evo-tab tab-pane-${i} fade" id="evolution-tab-pane${i}" role="tabpanel" tabindex="0">
            </div>
            <div class="tab-pane move-tab tab-pane-${i} fade" id="moves-tab-pane${i}" role="tabpanel" tabindex="0">
            </div>
        </div>`;
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

/* -------------------------animation test ----------------*/

// function animateBars(i){
//   let statsTab = document.getElementById('statsTab'+ i);
//   let statBars = document.querySelectorAll('.progress-bar');
//   if (statsTab.classList.contains('active')) {
//     statBars.forEach(function(statBar){
//       statBar.style.cssText = 'transform: scaleX(3)!important; transition: 300ms all ease-in-out';
//     });
//   } else {
//     statBars.forEach(function(statBar){
//       statBar.style.cssText = 'transform: scaleX(3)!important; transition: 300ms all ease-in-out';
//     });
//   }
// }

/* -------------- chart ------------- */


function insertStats(i) {
  let statsTab = document.getElementById('stats-tab-pane' + i);
  statsTab.innerHTML =/*html*/ `
  <div class="chart-box">
      <div class="progress" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-hp" style="width: ${pokemonData.stats[0].base_stat}%">${pokemonData.stats[0].base_stat} - HP</div>
      </div>
      <div class="progress" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-attack" style="width: ${pokemonData.stats[1].base_stat}%;">${pokemonData.stats[1].base_stat} - ATK</div>
      </div>
      <div class="progress" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-defense" style="width: ${pokemonData.stats[2].base_stat}%;">${pokemonData.stats[2].base_stat} - DEF</div>
      </div>
      <div class="progress" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-special-attack" style="width: ${pokemonData.stats[3].base_stat}%; padding-bottom: 1px;">${pokemonData.stats[3].base_stat} - S-ATK</div>
      </div> 
      <div class="progress" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-special-defense" style="width: ${pokemonData.stats[4].base_stat}%; padding-bottom: 0px;">${pokemonData.stats[4].base_stat} - S-DEF</div>
      </div> 
      <div class="progress" role="progressbar" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar bg-speed" style="width: ${pokemonData.stats[5].base_stat}%;">${pokemonData.stats[5].base_stat} - SPD</div>
      </div> 
  </div>
  `;
}


function insertAbout(i) {
  let about = pokemonSpecies.flavor_text_entries[1].flavor_text;
  let aboutField = document.getElementById('about-tab-pane' + i);
  aboutField.innerHTML = `
  <span class="about">${about.replace(/\f/g, ' ')} </span>
  `;
}

function insertMoves(i) {
  let moveTab = document.getElementById('moves-tab-pane' + i);

  for (let j = 0; j < pokemonData.moves.length; j++) {
    const move = pokemonData.moves[j].move.name;
    moveTab.innerHTML +=/*html*/ `
    <span class="move">${move}</span>
    `;
  }
}

async function insertEvolution(i) {
  let url = pokemonSpecies.evolution_chain.url;
  let evo1 = await loadEvolutionChain(url);
  evo1 = await evolutionChain.chain.species.name;
  evo2 = await evolutionChain.chain.evolves_to[0].species.name;
  evo3 = await evolutionChain.chain.evolves_to[0].evolves_to[0].species.name;

  let evolution = document.getElementById('evolution-tab-pane' + i);
  evolution.innerHTML +=/*html*/ `
   <h5 class="evo-name">
      <img id="evoImage1-${i}" class="evo-image" src="${await loadPokemonEvolution(evo1)}" alt="">
      ${evo1}
   </h5>
   <img class="arrow-image" src="img/arrowright.png" alt="">
   <h5 class="evo-name">   
      <img id="evoImage2-${i}" class="evo-image" src="${await loadPokemonEvolution(evo2)}" alt="">
      ${evo2}
   </h5>
   <img class="arrow-image" src="img/arrowright.png" alt="">
   <h5 class="evo-name">
      <img id="evoImage3-${i}" class="evo-image" src="${await loadPokemonEvolution(evo3)}" alt="">
      ${evo3}
   </h5>
  `;
  {
    if (evo1 == currentPokemon) {
      document.getElementById('evoImage1-' + i).classList.add('glow')
    } else if (evo2 == currentPokemon) {
      document.getElementById('evoImage2-' + i).classList.add('glow')
    } else if (evo3 == currentPokemon){
      document.getElementById('evoImage3-' + i).classList.add('glow')
    }

  }
}

async function loadPokemonEvolution(evo) {
  let url = `https://pokeapi.co/api/v2/pokemon/${evo}`;
  let response = await fetch(url);
  evo = await response.json();
  evo1Image = evo.sprites.other['official-artwork'].front_default;
  return evo1Image
}
