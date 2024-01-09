require("./models/db");

const express = require("express");
const path = require("path");
const handleBars = require("handlebars");
const exphbs = require("express-handlebars");
const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyparser = require("body-parser");
const spatialController = require("./controllers/geoController");


var app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());


app.get("/", (req, res) => {
    res.send(`

  <h2>Welcome to GeoSpatial Database!!</h2>

  <h3>Click here to get access to the <b> <a href="/stores">Database</a> </b></h3>`);
});

app.set("views", path.join(__dirname, "/views/layouts/"));

app.engine(
    "hbs",
    exphbs.engine({
        handlebars: allowInsecurePrototypeAccess(handleBars),
        extname: "hbs",
        defaultLayout: "mainLayout",
        layoutsDir: __dirname + "/views/layouts/",
    })
);

app.set("view engine", "hbs");


app.listen(3001, () => {
    console.log("Express server started at port: 3001");
});

app.use("/", spatialController);
