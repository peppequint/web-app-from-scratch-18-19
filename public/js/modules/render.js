import router from "./router.js";

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

export default render;
