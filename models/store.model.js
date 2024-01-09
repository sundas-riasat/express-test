const mongoose = require("mongoose");

var storeSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: "This field is required",
  },
  location: {
    type: {
        lat: String,
        lng: String
    },
    required: "This field is required",
  },
  address: {
    type: String,
    required: "This field is required",
  },
  openingHours: {
    type: String,
    required: "This field is required",
  },
});

mongoose.model("Store", storeSchema);
