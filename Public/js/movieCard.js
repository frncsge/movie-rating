const main = document.querySelector("main");
const kebabOverlay = document.querySelector(".kebab-overlay");

main.addEventListener("click", (e) => {
  const movieCard = e.target.closest(".movie-card");
  const kebabMenuBtn = e.target.closest(".kebab-menu-btn");
  const deleteBtn = e.target.closest(".delete-post-btn");
  const editBtn = e.target.closest(".edit-post-btn");

  //check if the movie card is clicked
  if (movieCard && !kebabMenuBtn && !deleteBtn && !editBtn) {
    const id = movieCard.dataset.id;
    window.location.href = `/viewRating/${id}`;
  }

  if (editBtn) {
    const id = e.target.closest(".movie-card").dataset.id;
    window.location.href = `/edit/${id}`;
  }

  //checks if the kebab menu button is clicked to show the kebab options
  if (kebabMenuBtn) {
    const kebabMenu = e.target.nextElementSibling; //this takes the next sibling of the kebabBtn which is the menu (home.ejs)
    if (!kebabMenu.classList.contains("show")) {
      kebabMenu.classList.add("show");
      kebabOverlay.classList.add("show");
    }
  }

  //checks if delete button is clicked
  if (deleteBtn) {
    const id = e.target.closest(".movie-card").dataset.id;
    const kebabMenuOptions = e.target.closest(".kebab-menu-options");

    //check if user actually wants to delete
    if (confirm("Are you sure you want to delete this post?")) {
      //fire up the delete route in express
      fetch(`/delete/${id}`, { method: "DELETE" })
        .then((res) => {
          if (res.ok) {
            window.location.href = "/";
          } else {
            console.error("Error deleting the post.");
          }
        })
        .catch((error) => {
          console.error("Delete fetch error:", error);
        });
    }

    //hides the options after user clicked delete
    kebabMenuOptions.classList.remove("show");
    kebabOverlay.classList.remove("show");
  }
});

kebabOverlay.addEventListener("click", () => {
  document.querySelector(".kebab-menu-options.show")?.classList.remove("show");
  kebabOverlay.classList.remove("show");
});
