const poke_container = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
const searchInput = document.querySelector(".searchInput");
// console.log(poke_container, search, searchBtn, searchInput);

const pokemon_count = 151;

const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAA9A9",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};

searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemon_count; i++) {
    // pokemon_count'a eşit olanları da dahil etmek için <= kullandım
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);
  createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  const pokemonType = pokemon.types[0].type.name; // pokemonType değişkeni burada tanımlanıyor
  const pokemonBg = bg_color[pokemonType] || "#fff"; // Renk bulunamazsa varsayılan renk beyaz

  pokemonDiv.style.backgroundColor = pokemonBg;

  const pokemonDivInnerHTML = `
      <div class="image-container">
          <img 
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemon.id
              }.png" 
              alt="${pokemon.name}"
          />
      </div>
      <div class="poke-info">
          <span class="poke-id">#${pokemon.id
            .toString()
            .padStart(3, "0")}</span>
          <h3 class="poke-name">${pokemon.name}</h3>
          <div class="small">
              <small class="poke-exp">
                  <i class="fa solid fa-flask"></i>${
                    pokemon.base_experience
                  } exp
              </small>
              <small class="poke-weight">
                  <i class="fa solid fa-weight"></i>${pokemon.weight} kg
              </small>
          </div>
          <div class="poke-type">
              <i class="fa-brands fa-uncharted"></i>${
                pokemon.types[0].type.name
              }
          </div>
      </div>
  `;

  pokemonDiv.innerHTML = pokemonDivInnerHTML;
  poke_container.appendChild(pokemonDiv);
};

const filterPokemon = () => {
  const filter = searchInput.value.toLowerCase(); // Arama girdisini küçük harfe çeviriyoruz
  const pokemonDivs = document.querySelectorAll(".pokemon");

  pokemonDivs.forEach((pokemonName) => {
    const name = pokemonName
      .querySelector(".poke-name")
      .textContent.toLowerCase(); // Pokémon adını küçük harfe çeviriyoruz
    if (name.includes(filter)) {
      pokemonName.style.display = "block";
    } else {
      pokemonName.style.display = "none";
    }
  });
};

searchInput.addEventListener("keyup", filterPokemon);

fetchPokemons();
