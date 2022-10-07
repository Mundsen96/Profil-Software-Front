
import { ListOfCharacters, FAVORITES } from './Classes/classes.js';
import  clearTable, { compareValues, getAPI } from './utils.js';

const message = document.getElementById('items-favorites');
message.textContent = `Favorites: ${FAVORITES.getFavorites()}`;
let CHARACTERS = null;

document.querySelectorAll('.api').forEach(wizard => {
  wizard.addEventListener("click", onRenderClick);
});

document.querySelectorAll('.sort').forEach(wizard => {
  wizard.addEventListener("click", sortTable);
});

document.getElementById('favorites').addEventListener('click', () => {
  if (!localStorage.getItem('favorites') || JSON.parse(localStorage.getItem('favorites')).length !== FAVORITES.getFavorites()) {
    let jsonFavorites = JSON.stringify(FAVORITES.favorites);
    localStorage.setItem('favorites', jsonFavorites);
  }
})

function sortTable(e) {
  if (!CHARACTERS) {
    return
  }
  if (!e.target.classList[1]) {
    e.target.classList.add('asc');
  } else if (e.target.classList[1] === 'asc') {
    e.target.classList.remove('asc');
    e.target.classList.add('desc');
  } else {
    e.target.classList.remove('desc');
  }
  let clickedTable = e.target.id === 'date' ? 'dateOfBirth' : e.target.id;
  let copyOfCharacters = [...CHARACTERS];
  let sortedCharacters = e.target.classList[1] ? copyOfCharacters.sort(compareValues(clickedTable, e.target.classList[1])) : CHARACTERS;
  let charsToRender = new ListOfCharacters(sortedCharacters);
  const table = document.querySelector('tbody');
  clearTable(table);
  charsToRender.render();
}

function onRenderClick(e) {
  const table = document.querySelector('tbody');
  clearTable(table);
  getAPI(e.target.classList[1])
    .then((data) => {
      let chars = new ListOfCharacters(data);
      CHARACTERS = data;
      chars.render();
    });
}


