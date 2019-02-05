var maleName = "Joost";

var femaleName = "Henk";

const url =
  "https://love-calculator.p.mashape.com/getPercentage?fname=" +
  maleName +
  "&sname=" +
  femaleName;
const request = new XMLHttpRequest();

request.open("get", url, true);
request.setRequestHeader(
  "X-Mashape-Key",
  "cpokaPQAoEmshKG26Ib7JwWYib01p1TF2fWjsnI6wNLkBMnA2O"
);

request.setRequestHeader("Accept", "application/json");

request.onload = function() {
  console.log(JSON.parse(this.responseText));
};

request.send();
