const kebabBtn = document.querySelectorAll(".kebab-menu-btn");

//this is to toggle the kebab-options-menu
kebabBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const kebabMenu = btn.nextElementSibling; //this takes the next sibling of the kebabBtn which is the menu (home.ejs)
    kebabMenu.classList.toggle("show");
  });
});
