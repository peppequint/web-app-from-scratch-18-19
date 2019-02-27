const app = {
  init: () => {
    console.log("Initializing");
    router.handle();
  },
  settings: {
    urlPokemon: "https://pokeapi.co/api/v2/pokemon/",
    urlChuck: "https://api.chucknorris.io/jokes/random",
    urlCountry: "https://restcountries.eu/rest/v2/all"
  }
};

const api = {
  call: () => {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      const url = api.urlPokemon;

      request.open("get", url, true);
      reqeust.addEventListener("load", function() {
        const data = api.parse(request.response);
        console.log("Test");
        resolve(data);
      });
    });
    request.send();
  }
};

const routes = {
  overview: () => {
    console.log("Routes overview");
    api
      .call()
      .then(data => {
        render.overview();
      })
      .catch(error => {
        console.log("Error");
      });
  }
};

const render = {
  overview: data => {
    console.log("Hij gaat naar render");
  }
};

const router = {
  handle: () => {
    routes.overview();
  }
};

app.init();
