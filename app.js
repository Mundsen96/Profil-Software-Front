
import {ListOfCharacters, FAVORITES} from './Classes/classes.js';

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
  if(!localStorage.getItem('favorites') || JSON.parse(localStorage.getItem('favorites')).length !== FAVORITES.getFavorites() ){
    let jsonFavorites = JSON.stringify(FAVORITES.favorites);
    localStorage.setItem('favorites', jsonFavorites);
  }
})

function sortTable(e){
  if(!CHARACTERS){
    return
  }
  if(!e.target.classList[1]){
    e.target.classList.add('asc');
  }else if(e.target.classList[1] === 'asc'){
    e.target.classList.remove('asc');
    e.target.classList.add('desc');
  }else{
    e.target.classList.remove('desc');
  }
  let clickedTable = e.target.id ==='date' ? 'dateOfBirth': e.target.id;
  let copyOfCharacters = [...CHARACTERS];
  let sortedCharacters = e.target.classList[1] ? copyOfCharacters.sort(compareValues(clickedTable, e.target.classList[1])) : CHARACTERS;
  let charsToRender = new ListOfCharacters(sortedCharacters);
  clearTable();
  charsToRender.render();
}

function onRenderClick(e) {
  clearTable();
  getAPI(e.target.classList[1])
    .then((data) => {
      let chars = new ListOfCharacters(data);
      CHARACTERS = data;
      chars.render();
  });
}


async function getAPI(house) {
  let houseAPI = house !== 'all' ? `house/${house}` : '';
  const fetchedData = await fetch(
    `https://hp-api.herokuapp.com/api/characters/${houseAPI}`
  );
  const jsonData = await fetchedData.json();
  console.log(jsonData);
  return jsonData;
}

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if(a[key] === "") {
      return 1;
   } else if(b[key] === "") {
      return -1;
   } else {
    const varA = key === 'dateOfBirth'
    ? createDate(a[key]) : a[key].toUpperCase();
    const varB = key === 'dateOfBirth'
    ? createDate(b[key]) : b[key].toUpperCase();

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : (order === 'asc')? comparison : 0
    );
   }
  };
}

function clearTable(){
  const table = document.querySelector('tbody');
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

function createDate(string){
const [day, month, year] = string.split('-');
const date = new Date(+year, month - 1, +day);
return date;
}
