const apiURL = "http://www.omdbapi.com";
const apiKey = "87cd98b4";

const searchResults = document.getElementById("search-results");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const addMovieForm = document.getElementById("add-movie-form");

displayMovieFromSessionStorage();
addPosterSrcAndMovieTitleToFormInput();

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

//im using event delegation for this to make the result wrappers clickable
searchResults.addEventListener("click", (event) => {
  const resultWrapper = event.target.closest(".result-wrapper");

  if (resultWrapper) {
    //get the elements inside result-wrapper and store it into sessionStorage
    const posterSrc = resultWrapper.querySelector(".poster-img").src;
    const movieTitle = resultWrapper.querySelector(".movie-title").textContent;
    const movieDate = resultWrapper.querySelector(".movie-date").textContent;
    sessionStorage.setItem("posterImgSrc", posterSrc);
    sessionStorage.setItem("movieTitle", movieTitle);
    sessionStorage.setItem("movieDate", movieDate);

    displayMovieFromSessionStorage();
    addPosterSrcAndMovieTitleToFormInput();

    //close the search results and clear the input text field after clicking a movie
    searchResults.style.display = "none";
    searchInput.value = "";
  }
});

//when user is done rating and clicks the submit button
addMovieForm.addEventListener("submit", () => {
  removeSelectedMovie();
  removeItemsFromSessionStorage();
});

function displayMovieFromSessionStorage() {
  const posterDisplay = document.getElementById("poster-display");
  const titleDateDisplay = document.getElementById("movie-title-display");

  //get the stored items from sessionStorage
  const posterImgSrc = sessionStorage.getItem("posterImgSrc");
  const movieTitle = sessionStorage.getItem("movieTitle");
  const movieDate = sessionStorage.getItem("movieDate");
  //then check if it has any value already inside. This is so if users refresh, img is still there
  if (posterImgSrc && movieTitle && movieDate) {
    posterDisplay.src = posterImgSrc;
    titleDateDisplay.textContent = `${movieTitle} (${movieDate})`;
  }
}

//this function adds the poster-display src and the <p> tag for movie title to the hidden input fields in an html form (add.ejs file)
function addPosterSrcAndMovieTitleToFormInput() {
  const hiddenPosterSrcInput = document.getElementById(
    "hidden-poster-display-src-input"
  );
  const hiddenMovieTitleInput = document.getElementById(
    "hidden-movie-title-display-input"
  );

  const posterImgSrc = sessionStorage.getItem("posterImgSrc");
  const movieTitle = sessionStorage.getItem("movieTitle");
  const movieDate = sessionStorage.getItem("movieDate");

  hiddenPosterSrcInput.value = posterImgSrc;
  hiddenMovieTitleInput.value = `${movieTitle} (${movieDate})`;
}

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

  if (!movies) {
    searchResults.innerHTML = "No results found.";
  } else {
    movies.forEach((movie) => {
      const { Title, Year, Poster } = movie;
      let searchResult;

      if (Poster === "N/A") {
        searchResult = setUpResultTemplate(Title, Year, noPhoto);
      } else {
        searchResult = setUpResultTemplate(Title, Year, Poster);
      }

      searchResults.insertAdjacentHTML("beforeend", searchResult);
    });
  }

  searchResults.style.display = "flex";
}

function setUpResultTemplate(title, year, poster) {
  //i used onerror for this to put a back-up img when the poster img fails to load
  //i set it up to null first so it only checks once incase the back-up also fails, causing an infinite error check loop
  const resultTemplate = `<div class="result-wrapper">
            <section class="result-movie-poster-img-section">
              <img
                class="poster-img"
                src="${poster}"
                alt="Movie poster"
                onerror="this.onerror=null; this.src='https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_1280.jpg'" 
              /> 
            </section>
            <section class="result-movie-info-section">
              <p class="movie-title">${title}</p>
              <p class="movie-date">${year}</p>
            </section>
          </div>`;

  return resultTemplate;
}

function removeSelectedMovie() {
  const posterDisplay = document.getElementById("poster-display");
  const titleDateDisplay = document.getElementById("movie-title-display");
  const noPhoto =
    "https://cdn.pixabay.com/photo/2015/11/03/08/56/question-mark-1019820_1280.jpg"; //substitute for no poster

  posterDisplay.src = noPhoto;
  titleDateDisplay.textContent = "No movie selected";
}

function removeItemsFromSessionStorage() {
  sessionStorage.removeItem("posterImgSrc");
  sessionStorage.removeItem("movieTitle");
  sessionStorage.removeItem("movieDate");
}
