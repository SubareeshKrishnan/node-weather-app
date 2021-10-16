const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const getWeather = require("./utils/weather");
// Define path for Express config
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Creating the object
const app = express();
const port = process.env.PORT || 3000; //Local;

// Set up handlebars engine and view location
app.set("view engine", "hbs");
// If the hbs templates are not in views folder but in custom folder, we use this code to direct the templates folder. For ex. views (Expess search for this as Default flder name) -> templates (renaming views folder to templates)
app.set("views", viewsPath);

// Config partial paths
hbs.registerPartials(partialPath);

// Set up static directory to serve
app.use(express.static(publicDir));

// Set up routing
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  } else {
    geocode(req.query.address, (error, data) => {
      if (error) {
        res.send({
          error: error,
        });
      }
      if (data) {
        getWeather(
          data,
          (
            error,
            { weather_description, temperature, feels_like, precipitation } = {}
          ) => {
            if (error) {
              res.send({
                error: error,
              });
            } else {
              res.send([
                {
                  location: data.location,
                  weather: weather_description,
                  temp: temperature,
                  feelsLike: feels_like,
                  precip: precipitation,
                },
              ]);
            }
          }
        );
      }
    });
  }
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Weather",
  });
});
// Listening to the port
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
