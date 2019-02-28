import pokemon from "./data/pokemon.js";

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
  getPokemon: item => {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      const url = app.link.urlPokemon + item;

      request.open("get", url, true);
      request.addEventListener("load", () => {
        const data = JSON.parse(request.response);
        render.detailPokemon(data);
      });
      request.send();
    });
  },
  getChuck: quote => {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      const url = app.link.urlChuck;

      request.open("get", url, true);
      request.addEventListener("load", () => {
        const data = JSON.parse(request.response);
        render.detailChuck(data);
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
  detailPokemon: item => {
    const pokemonHeader = document.querySelector(".header");
    const pokemonList = document.querySelector(".pokemon-list");
    const pokemonItem = document.querySelector(".pokemon-item");

    document.querySelector(".pokeball").style.animation =
      "2s rotating infinite";

    pokemonHeader.setAttribute("style", "transform: translateX(-100%)");
    pokemonList.setAttribute("style", "transform: translateX(-100%)");
    pokemonItem.setAttribute("style", "transform: translateX(-100%)");

    pokemonItem.innerHTML = `<h3 class="pokemon-name">${item.name}</h3>
    <img class="pokemon-image" src="${item.sprites.front_default}" alt="" />`;

    console.log(item);
  },
  detailChuck: quote => {
    console.log(quote);
  }
};

const router = {
  init: () => {
    routie("");
    routie(":pokemon", data => {
      api.getPokemon(data);
      api.getChuck(data);
    });
  },
  handle: () => {
    const buttonPokemon = document.querySelector(".button-search");
    const inputPokemon = document.querySelector(".pokemon-search");

    const feedbackPokeball = document.querySelector(".pokeball");

    inputPokemon.addEventListener("input", inputField => {
      const value = inputPokemon.value;

      if (value) {
        feedbackPokeball.classList.add("pokeball-active");
      } else if (!value) {
        feedbackPokeball.classList.remove("pokeball-active");
      }
    });

    buttonPokemon.addEventListener("click", showPokemonList => {
      const pokemonMatch = [];

      pokemon.map(pokemon => {
        if (pokemon.toUpperCase().includes(inputPokemon.value.toUpperCase())) {
          pokemonMatch.push(pokemon);
        }
      });
      render.overview(pokemonMatch);
    });
  }
};

app.init();
