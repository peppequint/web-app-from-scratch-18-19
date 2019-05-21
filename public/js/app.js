const app = {
  init: () => {
    console.log("Initializing");
    router.init();
  },
  link: {
    urlPokemon: "https://pokeapi.co/api/v2/pokemon/",
    urlCountry: "https://restcountries.eu/rest/v2/all"
  }
};

const api = {
  getData: data => {
    return Promise.all([api.pokemon(data), api.country(data)]).then(data =>
      render.overview(data)
    );
  },
  pokemon: item => {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      const overview = "?limit=30&offset=0";
      const url = app.link.urlPokemon + overview;

      request.open("get", url, true);
      request.addEventListener("load", () => {
        const data = JSON.parse(request.response);
        resolve(data);
      });
      request.send();
    });
  },
  detailPokemon: detail => {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      const url = app.link.urlPokemon + detail;

      request.open("get", url, true);
      request.addEventListener("load", () => {
        const data = JSON.parse(request.response);
        resolve(data);
        render.detail(data);
      });
      request.send();
    });
  },
  country: country => {
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

    const pokemon = search[0].results;
    pokemon.forEach(element => {
      // creates a li
      const pokemonListItem = document.createElement("a");
      pokemonListItem.setAttribute("class", "pokemon-list-item");
      pokemonListItem.setAttribute("href", "#" + element.name.toLowerCase());
      pokemonList.appendChild(pokemonListItem);
      // creates a href withing li
      const pokemonLink = document.createElement("li");
      pokemonListItem.appendChild(pokemonLink);
      pokemonLink.appendChild(document.createTextNode(element.name));
    });

    router.handle(search[0].results);
  },
  search: data => {
    const pokemonList = document.querySelector(".pokemon-list");
    pokemonList.innerHTML = "";

    data.forEach(element => {
      // creates a li
      const pokemonListItem = document.createElement("a");
      pokemonListItem.setAttribute("class", "pokemon-list-item");
      pokemonListItem.setAttribute("href", "#" + element);
      pokemonList.appendChild(pokemonListItem);
      // creates a href withing li
      const pokemonLink = document.createElement("li");
      pokemonListItem.appendChild(pokemonLink);
      pokemonLink.appendChild(document.createTextNode(element));
    });
  },
  detail: data => {
    // pokemon part
    console.log(data);
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
    <h3 class="pokemon-name">${data.name}</h3>
    <img class="pokemon-image" src="${data.sprites.front_default}" alt=""/>
    <ul>
      <li class="pokemon-data">Height: <span>${data.height}</span></li>
      <li class="pokemon-data">Weight: <span>${data.weight}</span></li>
      <li class="pokemon-data">Experience: <span>${
        data.base_experience
      }</span></li>
    </ul>
    <a class="pokemon-back" href="index.html">Go back</a>
    `;
  }
};

const router = {
  init: () => {
    routie("", data => {
      api.getData(data);
    });
    routie(":pokemon", data => {
      api.detailPokemon(data);
    });
  },
  handle: data => {
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

      data.forEach(data => {
        const pokemon = data.name;
        if (pokemon.toUpperCase().includes(inputPokemon.value.toUpperCase())) {
          pokemonMatch.push(pokemon);
        }
      });
      render.search(pokemonMatch);
    });
  }
};

app.init();
