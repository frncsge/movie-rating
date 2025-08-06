import express from "express";

const app = express();
const port = 3000;

const movies = {
  id: 1,
  title: "The Notebook",
  year: 2004,
  poster: "https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_1280.jpg"
};

app.use(express.static("Public"));

app.get("/", (req, res) => {
  res.render("home.ejs", { movies });
});

app.get("/addpage", (req, res) => {
  res.render("add.ejs");
});

app.listen(port, () => {
  console.log("Running on localhost:" + port);
});
