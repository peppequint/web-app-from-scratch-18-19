import api from "./api.js";
import render from "./render.js";

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

export default router;
