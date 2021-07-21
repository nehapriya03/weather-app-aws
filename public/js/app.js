console.log("Clinet side js script loaded");

fetch("https://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    if (data.error) {
      console.log(error);
    }
  });
});

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");

message1.textContent = "Loading..";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(search.value);
  fetch("http://localhost:3000/weather?address=" + search.value).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          message1.textContent = data.error;
          console.log(data.error);
        } else {
          message1.textContent = "Location is: " + data.location;
          message2.textContent = "Forecast is " + data.forecast;
          //   console.log(data.location);
          //   console.log(data.forecast);
        }
      });
    }
  );
});
