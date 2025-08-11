import express from "express";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  password: "goofygoober",
  host: "localhost",
  port: 5432,
  database: "movie_rating_db",
});
db.connect();

app.use(express.static("Public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const movies = await getAllMovies();
    console.log(movies);
    res.render("home.ejs", { movies });
  } catch (error) {
    console.log(
      "Error getting all the movies from the database:",
      error.message
    );
  }
});

app.get("/addpage", (req, res) => {
  res.render("add.ejs");
});

app.post("/addMovie", async (req, res) => {
  try {
    await addMovieToDB(req.body);
    res.redirect("/");
  } catch (error) {
    console.log("Error when adding values to database:", error.message);
  }
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
});

app.listen(port, () => {
  console.log("Running on localhost:" + port);
});

async function getAllMovies() {
  try {
    const result = await db.query(
      "SELECT * FROM movie_ratings ORDER BY id DESC"
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function addMovieToDB(movie) {
  try {
    const result = await db.query(
      "INSERT INTO movie_ratings (title, rating, score, poster) VALUES ($1, $2, $3, $4)",
      [movie.title, movie.rating, movie.score, movie.poster]
    );
  } catch (error) {
    throw error;
  }
}

//to do
//allow post of a rating. just use an html form to trigger a post req!
