const main = document.querySelector("main");

main.addEventListener("click", (e) => {
  if (e.target.classList.contains("kebab-menu-btn")) {
    const kebebMenu = e.target.nextElementSibling; //this takes the next sibling of the kebabBtn which is the menu (home.ejs)
    kebebMenu.classList.toggle("show");
  }

  if (e.target.classList.contains("delete-post-btn")) {
    const id = e.target.closest(".movie-card").dataset.id;

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
});
