const mongoose = require("mongoose");

var url = "mongodb://localhost:27017/geospatialDB";

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("Connection succeeded");
    } else {
      console.log("Error in connection: " + err);
    }
  }
);

require("./store.model");
