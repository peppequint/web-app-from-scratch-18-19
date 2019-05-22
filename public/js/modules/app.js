import router from "./router.js";

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

export default app;
