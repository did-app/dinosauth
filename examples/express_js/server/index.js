const express = require("express");
const { Issuer } = require("openid-client");

const port = 3000;

var client;
var issuer;
Issuer.discover("http://localhost:8080/.well-known/openid-configuration") // => Promise
  .then(function(i) {
    issuer = i;
    console.log("Discovered issuer %s %O", issuer.issuer, issuer.metadata);

    client = new issuer.Client({
      client_id: "http://localhost:3000/callback",
      response_types: ["id_token"],
      id_token_signed_response_alg: "ES256"
    });
  });

const app = express();

app.set("view engine", "pug");

app.get("/", function(req, res) {
  res.render("index", {});
});
app.get("/sign-in", function(req, res) {
  authUrl = client.authorizationUrl({
    scope: "openid"
  });
  res.redirect(authUrl);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
