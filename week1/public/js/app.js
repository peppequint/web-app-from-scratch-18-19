const randomNumber = Math.floor(Math.random() * 250 + 1);

const chuckQuote = new Promise(function(resolve, reject) {
  const url = "https://api.chucknorris.io/jokes/random";
  const request = new XMLHttpRequest();

  request.open("get", url, true);

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      const data = JSON.parse(request.responseText);
      resolve(data);
    } else {
      // We reached our target server, but it returned an error
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
      // Success!
      const data = JSON.parse(request.responseText);
      resolve(data);
    } else {
      // We reached our target server, but it returned an error
      reject("Error Countries");
    }
  };

  request.send();
});

const pokemonName = new Promise(function(resolve, reject) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + randomNumber;
  const request = new XMLHttpRequest();

  request.open("get", url, true);

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      const data = JSON.parse(request.responseText);
      resolve(data);
    } else {
      // We reached our target server, but it returned an error
      reject("Error Pokemons");
    }
  };

  request.send();
});

Promise.all([chuckQuote, countryName, pokemonName]).then(function(data) {
  randomQuote(data[0]);
  randomCountry(data[1]);
  randomPokemon(data[2]);
});

function randomQuote(data) {
  const quoteSentence = (document.querySelector(".chuck-quote").innerHTML =
    "'" + data.value + "'");
}

function randomCountry(data) {
  const countryName = (document.querySelector(".country-name").innerHTML =
    data[randomNumber].name);
}

function randomPokemon(data) {
  const pokemonName = (document.querySelector(".pokemon-name").innerHTML =
    data.name);
  const pokemonImg = (document.querySelector(".pokemon-image").src =
    data.sprites.front_default);
}
