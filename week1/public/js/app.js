const randomNumber = Math.floor(Math.random() * 250 + 1);

// const buttonSearch = document.querySelector(".button-search");
// const inputPokemonValue = document.querySelector(".pokemon-search");
//
// buttonSearch.addEventListener("click", function() {
//   console.log(inputPokemonValue.value);
// });

const chuckQuote = new Promise(function(resolve, reject) {
  const url = "https://api.chucknorris.io/jokes/random";
  const request = new XMLHttpRequest();

  request.open("get", url, true);

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText);
      resolve(data);
    } else {
      reject("Error Chuck");
    }
  };

  request.send();
});

const countryName = new Promise(function(resolve, reject) {
  const url = "https://restcountries.eu/rest/v2/all";
  const request = new XMLHttpRequest();

  request.open("get", url, true);

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText);
      resolve(data);
    } else {
      reject("Error Countries");
    }
  };

  request.send();
});

const pokemonName = new Promise(function(resolve, reject) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + randomNumber; // + input value (howto?)
  const request = new XMLHttpRequest();

  request.open("get", url, true);

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText);
      resolve(data);
    } else {
      reject("Error Pokemons");
    }
  };

  request.send();
});

Promise.all([chuckQuote, countryName, pokemonName]).then(function(data) {
  randomQuote(data[0]);
  // randomCountry(data[1]);
  randomPokemon(data[2]);
});

function randomQuote(data) {
  const quoteSentence = (document.querySelector(
    ".pokemon-sentence > h4"
  ).innerHTML = "'" + data.value + "'");
}
//
// function randomCountry(data) {
//   const countryName = (document.querySelector(".country-name").innerHTML =
//     data[randomNumber].name);
// }

function randomPokemon(data) {
  const pokemonName = (document.querySelector(".pokemon-name > h3").innerHTML =
    data.name);
  const pokemonImg = (document.querySelector(".pokemon-image").src =
    data.sprites.front_default);
}
