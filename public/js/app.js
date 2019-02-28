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
  call: data => {
    return Promise.all([
      api.getPokemon(data),
      api.getChuck(data),
      api.getCountry(data)
    ]).then(data => render.detail(data), console.log("Solved data"));
  },
  getPokemon: item => {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      const url = app.link.urlPokemon + item;

      request.open("get", url, true);
      request.addEventListener("load", () => {
        const data = JSON.parse(request.response);
        resolve(data);
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
        resolve(data);
      });
      request.send();
    });
  },
  getCountry: country => {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      const url = app.link.urlCountry;

      request.open("get", url, true);
      request.addEventListener("load", () => {
        const data = JSON.parse(request.response);
        resolve(data);
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
  detail: data => {
    // pokemon part
    const pokemonOverview = document.querySelector(".pokemon-item");

    pokemonOverview.setAttribute("style", "transform: translateX(-100%)");
    document.querySelector(".pokeball").style.animation =
      "2s rotating infinite";
    document
      .querySelector(".header")
      .setAttribute("style", "transform: translateX(-100%)");
    document
      .querySelector(".pokemon-list")
      .setAttribute("style", "transform: translateX(-100%)");

    const pokemonStats = document.createElement("div");
    pokemonStats.setAttribute("class", "pokemon-stats");
    pokemonOverview.appendChild(pokemonStats);

    pokemonStats.innerHTML = `
    <h3 class="pokemon-name">${data[0].name}</h3>
    <img class="pokemon-image" src="${data[0].sprites.front_default}" alt=""/>
    <ul>
      <li class="pokemon-data">Height: <span>${data[0].height}</span></li>
      <li class="pokemon-data">Weight: <span>${data[0].weight}</span></li>
      <li class="pokemon-data">Experience: <span>${
        data[0].base_experience
      }</span></li>
    </ul>
    `;

    // country part
    const country = document.createElement("div");
    country.setAttribute("class", "country-of-origin");
    pokemonOverview.appendChild(country);

    const randomCountry = Math.floor(Math.random() * 249 + 1);

    country.innerHTML = `
    <img class="pokemon-icon" src="public/src/img/_Pokemon-Location.png" alt="pokemon icon"/>
    <h5>${data[2][randomCountry].name}</h5>
    <img class="pokemon-icon" src="public/src/img/_Bookmark.png" alt="pokemon icon"/>
    <h5>${data[2][randomCountry].capital}</h5>
    <img class="pokemon-icon" src="public/src/img/_Coin.png" alt="pokemon icon"/>
    <h5>${data[2][randomCountry].currencies[0].name}</h5>
    `;
  }
};

const router = {
  init: () => {
    routie("/");
    routie(":pokemon", data => {
      api.call(data);
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
