import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});
db.connect();

app.use(express.static("Public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const { sortBy, sortOrder } = req.query;
    const movies = await getAllMovies(sortBy || "id", sortOrder || "DESC");
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

app.get("/viewRating/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await getMovie(id);
    res.render("viewRating.ejs", { movie });
  } catch (error) {
    console.log("Error getting the movie from the database:", error.message);
  }
});

app.post("/addMovie", async (req, res) => {
  try {
    await addMovieToDB(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.log("Error when adding values to database:", error.message);
    res.sendStatus(409);
  }
});

app.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await getMovie(id);
    console.log("Movie from DB:", movie);
    res.render("edit.ejs", { movie });
  } catch (error) {
    console.log("Error getting the movie from the database:", error.message);
  }
});

app.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log(req.body);
    await editPost(req.body, id);
    res.redirect("/");
  } catch (error) {
    console.log("Error when updating values to database:", error.message);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deletePost(id);
    res.sendStatus(200);
  } catch (error) {
    console.log("Error deleting post. Detail:", error.message);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log("Running on localhost:" + port);
});

async function getAllMovies(sortBy, sortOrder) {
  try {
    const result = await db.query(
      `SELECT * FROM movie_ratings ORDER BY ${sortBy} ${sortOrder}`
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
}

async function getMovie(id) {
  try {
    const result = await db.query("SELECT * FROM movie_ratings WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

async function addMovieToDB(movie) {
  try {
    await db.query(
      "INSERT INTO movie_ratings (title, rating, score, poster) VALUES ($1, $2, $3, $4)",
      [movie.title, movie.rating, movie.score, movie.poster]
    );
  } catch (error) {
    throw error;
  }
}

async function deletePost(id) {
  try {
    await db.query("DELETE FROM movie_ratings WHERE id = $1", [id]);
    console.log(`Post with id ${id} is deleted.`);
  } catch (error) {
    throw error;
  }
}

async function editPost(movie, id) {
  try {
    await db.query(
      "UPDATE movie_ratings SET title=$1, score=$2, rating=$3, poster=$4 WHERE id=$5",
      [movie.title, movie.score, movie.rating, movie.poster, id]
    );
  } catch (error) {
    throw error;
  }
}

//to do
//allow post of a rating. just use an html form to trigger a post req!
