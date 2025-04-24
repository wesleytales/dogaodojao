const menuButton = document.querySelector('.menu-button');
const menuItems = document.querySelector('.menu-items');
const closeButton = document.querySelector('.close-button');

menuButton.addEventListener('click', () => {
    menuItems.classList.add('show');
});

closeButton.addEventListener('click', () => {
    menuItems.classList.remove('show');
});