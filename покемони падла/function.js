const BASE_API = "https://pokeapi.co/api/v2/";
const poke_list = document.querySelector(".poke-list");
const searchBtn = document.querySelector(".btn");
const searchInput = document.querySelector(".inp");
let offset = 0;

function getPokemonData(url) {
  return fetch(url).then((response) => response.json());
}
function searchCreate(pokemonDetails) {
  poke_list.innerHTML = "";
  const abilities = pokemonDetails.abilities
    .map((ability) => ability.ability.name)
    .join(", ");
  const sprites = pokemonDetails.sprites;
  const name = pokemonDetails.name;

  const pokemonItem = `
      <li class="pokemon">
        <img src="${sprites.front_default}" alt="" class="pokemon-pic">
        <p class="pokemon-name">${name}</p>
        <p class="pokemon-skills">${abilities}</p>
      </li>`;

  poke_list.insertAdjacentHTML("beforeend", pokemonItem);
}

function createPokemonElements(pokemonData) {
    poke_list.innerHTML = "";
  
    pokemonData.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemonDetails) => {
          const abilities = pokemonDetails.abilities
            .map((ability) => ability.ability.name)
            .join(", ");
  
          const pokemonItem = `
            <li class="pokemon">
              <img src="${pokemonDetails.sprites.front_default}" alt="" class="pokemon-pic">
              <p class="pokemon-name">${pokemonDetails.name}</p>
              <p class="pokemon-skills">${abilities}</p>
            </li>`;
  
          poke_list.insertAdjacentHTML("beforeend", pokemonItem);
        });
    });
  }
  

searchBtn.addEventListener("click", search);
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    search();
  }
});
function search() {
  const searchValue = searchInput.value.trim();
  if (!searchValue) {
    alert("search error");
    getPokemonData(`${BASE_API}pokemon?limit=9&offset=${offset}`).then((data) =>
      createPokemonElements(data.results)
    );
    return;
  }

  getPokemonData(`${BASE_API}pokemon/${searchValue}`)
  .then((data) =>
    searchCreate(data));
  searchInput.value = "";
}

getPokemonData(`${BASE_API}pokemon?limit=1100&offset=${offset}`).then((data) =>
  createPokemonElements(data.results)
);
