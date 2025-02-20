const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
var moment = require("moment");

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// app.listen(port, () => {
//   console.log("");
// });

mongoose
  .connect(
    "mongodb+srv://devabdullah:DX3E20fxXAP9Cc2p@cluster0.87swi.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log("Done King!");
    });
  })
  .catch((err) => {
    console.log(err);
  });

const Customer = require("./models/customerSchema");

// GET request //

app.get("/", (req, res) => {
  Customer.find()
    .then((result) => {
      console.log("=============================");
      console.log(result);
      res.render("index", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});
app.get("/user/add.html", (req, res) => {
  res.render("user/add");
});

app.get("/edit/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((result) => {
      console.log("===========================");
      console.log(result);
      res.render("user/edit", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((result) => {
      console.log("===========================");
      console.log(result);
      res.render("user/view", { obj: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/search.html", (req, res) => {
  res.render("user/search");
});

// POST Request //

app.post("/user/add.html", (req, res) => {
  console.log(req.body);
  Customer.create(req.body)
    .then(() => {
      console.log("The Information Has Been Sent!");
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// PUT request //

app.put("/edit/:id", (req, res) => {
  Customer.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// DElETE Request //

app.delete("/delete/:id", (req, res) => {
  Customer.deleteOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});
