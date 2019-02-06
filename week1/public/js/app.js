const url = "https://api.chucknorris.io/jokes/random";
const request = new XMLHttpRequest();

request.open("get", url, true);
request.addEventListener("load", requestListener);
request.send();

function requestListener() {
  let chuckQuote = JSON.parse(this.responseText);
  let quoteText = (document.querySelector("h1").innerHTML = chuckQuote.value);
}
