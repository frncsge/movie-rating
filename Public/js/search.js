const apiURL = "http://www.omdbapi.com";
const apiKey = "87cd98b4";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

//if user clicks search
searchBtn.addEventListener("click", async () => {
  const userInput = searchInput.value;
  const movies = await getMovies(userInput);
  showPosters(movies);
});

//if user press enter when searching
searchInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const userInput = searchInput.value;
    const movies = await getMovies(userInput);
    showPosters(movies);
  }
});

//fetch api
async function getMovies(userInput) {
  try {
    const result = await fetch(
      apiURL + "/?apikey=" + apiKey + "&s=" + userInput
    );
    const data = await result.json();

    console.log("data here ", data.Search);
    return data.Search;
  } catch (error) {
    throw error;
  }
}

//show fetch api result
function showPosters(movies) {
  const searchResults = document.getElementById("search-results");
  const noPhoto =
    "https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_1280.jpg"; //substitute for no poster

  //remove items inside the search results first
  searchResults.innerHTML = "";

  movies.forEach((movie) => {
    const img = document.createElement("img");
    img.className = "poster-img";

    if (movie.Poster === "N/A") {
      img.src = noPhoto;
    } else {
      img.src = movie.Poster;
    }

    searchResults.appendChild(img);
  });
}
