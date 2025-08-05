const apiURL = "http://www.omdbapi.com";
const apiKey = "87cd98b4";

const searchResults = document.getElementById("search-results");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

//if user clicks search
searchBtn.addEventListener("click", async () => {
  const userInput = searchInput.value;

  if (userInput !== "") {
    const movies = await getMovies(userInput);
    showMovies(movies);
  }
});

//if user press enter when searching
searchInput.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    const userInput = searchInput.value;
    const movies = await getMovies(userInput);
    showMovies(movies);
  }
});

//close results if user clicks outside of it
document.addEventListener("click", (event) => {
  const clickedOutsideSearch =
    !searchResults.contains(event.target) && //check if user clicked outisde the search bar and search results
    !searchInput.contains(event.target);

  if (clickedOutsideSearch && searchResults.style.display === "flex") {
    searchResults.style.display = "none";
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
function showMovies(movies) {
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
    searchResults.style.display = "flex";
  });
}
