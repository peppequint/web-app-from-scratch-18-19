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

Promise.all([chuckQuote, countryName]).then(function(data) {
  randomQuote(data);
  randomCountry(data);
});

function randomQuote(data) {
  const quoteSentence = (document.querySelector(".chuck-quote").innerHTML =
    "'" + data[0].value + "'");
}

function randomCountry(data) {
  console.log(data);
  let i = Math.floor(Math.random() * 250 + 1);
  let countryName = (document.querySelector(".country-name").innerHTML =
    data[1][i].name);
}
