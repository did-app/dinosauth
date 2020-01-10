const express = require("express");
const { Issuer } = require("openid-client");

const port = 3000;

const app = express();

app.set("view engine", "pug");

app.get("/", function(req, res) {
  res.render("index", {});
});
app.get("/sign-in", function(req, res) {
  res.redirect("http://localhost:8080/wallet");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
