const select = document.getElementById('numCol');
const favorites = JSON.parse(localStorage.getItem('favorites'));
select.addEventListener('change', (e) => renderBoxes(e, favorites))
window.addEventListener('load', (e) => renderBoxes(e, favorites));

function renderBoxes(e, data){
  const renderHook = document.querySelector('.cards');
  renderHook.style.gridTemplateColumns = '1fr '.repeat(e.target.value);
  while (renderHook.firstChild) {
    renderHook.removeChild(renderHook.firstChild);
  }
  for(let i=0; i<data.length; i++){
    let box = document.createElement('div');
    data[i].house === '' ? box.classList.add('card') : box.classList.add('card', data[i].house.toLowerCase()) 
    let image = document.createElement('img');
    image.src = data[i].image, image.alt = 'portrait'
    box.append(image);
    let element = document.createElement('p');
    element.textContent = data[i].name === '' ? 'No-data' : `${data[i].name}`;
    box.append(element);
    let button = document.createElement('button');
    button.textContent = 'Remove from Favorites', button.className = 'button-remove';
    button.addEventListener('click', (e) => removeFromFavorites(e, renderHook))
    box.append(button);
    renderHook.append(box);
  }
}

function removeFromFavorites(e, parent){
  const index = [...parent.children].indexOf(
    e.target.parentElement
  );
  e.target.parentElement.remove();
  let favoritesToSend = favorites;
  favoritesToSend.splice(index, 1);
  let jsonFavorites = JSON.stringify(favoritesToSend);
  localStorage.setItem('favorites', jsonFavorites);
}