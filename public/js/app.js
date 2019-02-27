pokemonList = {};
const app = {
  init: () => {
    console.log("Initializing");
    router.handle();
    router.init();
  },
  link: {
    urlPokemon: "https://pokeapi.co/api/v2/pokemon/",
    urlChuck: "https://api.chucknorris.io/jokes/random",
    urlCountry: "https://restcountries.eu/rest/v2/all"
  }
};

const api = {
  call: item => {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      const url = app.link.urlPokemon + item;

      request.open("get", url, true);
      request.addEventListener("load", () => {
        const data = JSON.parse(request.response);
        render.detail(data);
      });
      request.send();
    });
  }
};

const render = {
  overview: search => {
    const pokemonList = document.querySelector(".pokemon-list");
    pokemonList.innerHTML = "";

    search.forEach(element => {
      // creates a li
      const pokemonListItem = document.createElement("a");
      pokemonListItem.setAttribute("class", "pokemon-list-item");
      pokemonListItem.setAttribute("href", "#" + element.toLowerCase());
      pokemonList.appendChild(pokemonListItem);
      // creates a href withing li
      const pokemonLink = document.createElement("li");
      pokemonListItem.appendChild(pokemonLink);
      pokemonLink.appendChild(document.createTextNode(element));
    });
  },
  detail: item => {
    const pokemonItem = document.querySelector(".pokemon-item");
    const pokemonList = document.querySelector(".pokemon-result");

    pokemonItem.innerHTML = `<h3 class="pokemon-name">${item.name}</h3>
    <img class="pokemon-image" src="${item.sprites.front_default}" alt="" />`;

    pokemonItem.setAttribute("style", "transform: translateX(-100%)");
    pokemonList.setAttribute("style", "transform: translateX(-100%)");
  }
};

const router = {
  init: () => {
    routie("");
    routie(":pokemon", data => {
      api.call(data);
    });
  },
  handle: () => {
    const pokemonButton = document.querySelector(".button-search");
    const inputPokemonValue = document.querySelector(".pokemon-search");

    pokemonButton.addEventListener("click", showPokemonList => {
      const pokemonMatch = [];

      pokemonList.pokemon.forEach(pokemon => {
        if (
          pokemon.toUpperCase().includes(inputPokemonValue.value.toUpperCase())
        )
          // if so, push to new array
          pokemonMatch.push(pokemon);
      });
      render.overview(pokemonMatch);
    });
  }
};

app.init();
