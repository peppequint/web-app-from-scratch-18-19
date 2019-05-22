import app from "./app.js";
import render from "./render.js";

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

export default api;
