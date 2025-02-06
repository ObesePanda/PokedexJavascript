const listPokemon = document.querySelector("#listPokemon");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const totalPokemons = 1025;
let pokemons = [];

let promises = [];
for (let i = 1; i <= totalPokemons; i++) {
  promises.push(fetch(URL + i).then((response) => response.json()));
}

Promise.all(promises)
  .then((results) => {
    pokemons = results.sort((a, b) => a.id - b.id);

    // Renderizar los Pokémon en orden
    pokemons.forEach((data) => viewPokemon(data));
  })
  .catch((error) => console.error("Error al obtener los Pokémon:", error));

function viewPokemon(data) {
  let tipos = data.types
    .map((type) => `<p class="type ${type.type.name}">${type.type.name}</p>`)
    .join("");

  let pokeId = data.id.toString();
  if (pokeId.length === 1) {
    pokeId = "00" + pokeId;
  } else if (pokeId.length === 2) {
    pokeId = "0" + pokeId;
  }
  const div = document.createElement("div");
  div.classList.add("pokedex");
  div.innerHTML = `
    <div class="pokemon">
      <p class="pokemon-id-back">#${pokeId}</p>
      <div class="image-pokemon">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="${data.name}" />
      </div>
      <br>
      <hr>
      <div class="image-pokemon-sprites">     
      <div >
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${data.id}.png" alt="${data.name}" />
      </div>
      </div>
      <div class="info-pokemon">
        <div class="name-pokemon">
          <p class="pokemon-id">#${pokeId}</p>
          <h2>${data.name}</h2>
        </div>
        <div class="type-pokemon">
          ${tipos}
        </div>
        <div class="stats-pokemon">
          <p class="stat">Altura: ${data.height}m</p>
          <p class="stat">Peso: ${data.weight}kg</p>                 
        </div>
        <div class="experience-pokemon">
          <p class="stat">Experiencia base: ${data.base_experience}</p>
        </div>
      </div>
    </div>`;

  listPokemon.append(div);
}
