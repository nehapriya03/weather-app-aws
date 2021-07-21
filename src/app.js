const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("../src/utils/geoCode");
const forecast = require("../src/utils/forecast");

const app = express();

const publicDirectory = path.join(__dirname, "../public/");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Neha Priyadarshani",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Neha Priyadarshani",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is a help page",
    title: "Help",
    name: "Neha Priyadarshani",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide the address",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", { errorMessage: "Help article not found", title: "404" });
});

app.get;

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
