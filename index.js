import express from "express";

const app = express();
const port = 3000;

const movies = [
  {
    id: 1,
    title: "The Notebook",
    year: 2004,
    poster:
      "https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_1280.jpg",
    rating:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend a dolor eget laoreet. Etiam accumsan sagittis tortor vel aliquam. Aenean tristique ante in ligula interdum, eget luctus lorem fermentum. Donec ac libero lacus. Pellentesque rutrum iaculis magna a rutrum. Etiam id posuere felis. Quisque eu ipsum in dui feugiat imperdiet. Pellentesque euismod tristique vehicula. Fusce vulputate viverra gravida. Fusce euismod felis quis blandit vestibulum. Integer magna ex, fringilla eget urna ut, posuere vehicula mi. Integer quis sollicitudin elit.",
    score: 5,
    date: "22/12/2004"
  },
  {
    id: 2,
    title: "Green Book",
    year: 2018,
    poster:
      "https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_1280.jpg",
    rating:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eleifend a dolor eget laoreet. Etiam accumsan sagittis tortor vel aliquam. Aenean tristique ante in ligula interdum, eget luctus lorem fermentum. Donec ac libero lacus. Pellentesque rutrum iaculis magna a rutrum. Etiam id posuere felis. Quisque eu ipsum in dui feugiat imperdiet. Pellentesque euismod tristique vehicula. Fusce vulputate viverra gravida. Fusce euismod felis quis blandit vestibulum. Integer magna ex, fringilla eget urna ut, posuere vehicula mi. Integer quis sollicitudin elit.",
    score: 5,
    date: "09/09/2005"
  },
];

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
