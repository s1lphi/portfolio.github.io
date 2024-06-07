const burgerBtn = document.getElementById('burgercont');
const closeMobMenu = document.getElementById('closeburger');
const navMenu = document.getElementById('navmenu');

burgerBtn.addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
    document.body.style.overflow = "hidden";
    navMenu.style.display = "flex";
});

closeMobMenu.addEventListener('click', () => {
  document.body.style.overflow = "";
  navMenu.style.display = "none";
})