const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Store = mongoose.model("Store");

router.get("/stores/add", (req, res) => {
  res.render("add", {
    viewTitle: "Add Store",
  });
});

router.post("/stores", (req, res) => {
  insertRecord(req, res);
});

function insertRecord(req, res) {
  var store = new Store();
  store.storeName = req.body.storeName;
  let point = {
    lat: req.body.location.split(",")[0],
    lng: req.body.location.split(",")[1],
  };
  store.location = point;
  console.log(store.location);
  store.address = req.body.address;
  store.openingHours = req.body.openingHours;
  store.save((err, doc) => {
    if (!err) {
      res.redirect("/stores");
    } else {
      console.log("Error during insert: " + err);
    }
  });
}

router.get("/stores", (req, res) => {
  Store.find((err, docs) => {
    if (!err) {
      res.render("list", {
        list: docs,
      });
    } else {
      console.log("Error in retrieval: " + err);
    }
  });
});

router.get("/stores/nearest", (req, res) => {
  res.render("nearest", {
    viewTitle: "Stores Near Me",
  });
});

router.post("/stores/nearme", (req, res) => {
  Store.find((err, docs) => {
    if (!err) {
      let location = {
        lat: req.body.location.split(",")[0],
        lng: req.body.location.split(",")[1],
      }
      let newDocs = docs.filter(doc => {
        let distance = calcDistance(location.lat, location.lng, doc.location.lat, doc.location.lng)
        return distance < 10 // Only return docs with distance less than 10km
      })
      res.render("list", {
        list: newDocs,
      });
    } else {
      console.log("Error in retrieval: " + err);
    }
  });
});

function calcDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}

module.exports = router;
