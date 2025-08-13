const main = document.querySelector("main");

main.addEventListener("click", (e) => {
  //checks if the kebab menu button is clicked to show the kebab options
  if (e.target.classList.contains("kebab-menu-btn")) {
    const kebebMenu = e.target.nextElementSibling; //this takes the next sibling of the kebabBtn which is the menu (home.ejs)
    kebebMenu.classList.toggle("show");
  }

  //checks if delete button is clicked
  if (e.target.classList.contains("delete-post-btn")) {
    const id = e.target.closest(".movie-card").dataset.id;
    const kebabMenu = e.target.closest(".kebab-menu-options");

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
    kebabMenu.classList.remove("show");
  }
});
