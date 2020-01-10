const express = require("express");
const port = 3000;

const app = express();
app.set("view engine", "pug");
app.get("/", function(req, res) {
  res.render("index", {});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
