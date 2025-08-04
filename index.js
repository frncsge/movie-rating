import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("Public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.listen(port, () => {
  console.log("Running on localhost:" + port);
});
