class Favorites {
  constructor() {
    this.favorites = [];
  }

  getFavorites() {
    return this.favorites.length;
  }

  setFavorites(newCharacter) {
    this.favorites.push(newCharacter);
  }

  remove(character) {
    for (const el of this.favorites) {
      if (el === character) {
        this.favorites.splice([this.favorites.indexOf(el)], 1);
      }
    }
  }
}

let FAVORITES = new Favorites();


class Character {
  constructor(character) {
    this.name = character.name;
    this.date = character.dateOfBirth;
    this.house = character.house;
    this.wizard = character.wizard;
    this.ancestry = character.ancestry;
    this.student = character.hogwartsStudent;
    this.image = character.image;
  }
}

class CharacterItem {
  constructor(character) {
    this.character = character;
  }

  render() {
    const characterWrapper = document.createElement('tr');
    for(const key in this.character){
      if(key === 'image'){
        continue;
      }
      let element = document.createElement('td');
      element.textContent = this.character[key] === '' ? 'No-data' : this.character[key];
      characterWrapper.append(element);
    }
    return characterWrapper;
  }
}

export class ListOfCharacters {
  constructor(characters) {
    this.characters = characters.map((character) => new Character(character));
  }

  render() {
    const renderHook = document.querySelector('table');
    for (const character of this.characters) {
      const characterItem = new CharacterItem(character);
      const characterEl = characterItem.render();
      const modal = new Modal(character);
      characterEl.addEventListener('click', () => modal.render());
      renderHook.append(characterEl);
    }

  }
}

class Modal {
  constructor(character){
    this.character = character;
    this.favoritesButton = 'Add to Favorites';
  }

  render(){
    const renderHook = document.getElementById('modal');
    const image = document.createElement('img');
    image.src = this.character.image , image.alt = 'portait', image.style.width = '150px';
    renderHook.append(image);
    for(const key in this.character){
      if(key === 'image'){
        continue;
      }
      let element = document.createElement('p');
      element.textContent = this.character[key] === '' ? 'No-data' : `${key}: ${this.character[key]}`;
      renderHook.append(element);
    }
    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = this.favoritesButton;
    favoriteButton.addEventListener('click', this.addToFavorites.bind(this))
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', this.remove.bind(this))
    renderHook.append(favoriteButton,closeButton);
    const modalWindowOverlay = document.getElementById("modal-overlay");
    modalWindowOverlay.style.display = 'flex';
  }

  addToFavorites(){
    if (this.favoritesButton == 'Add to Favorites') {
      FAVORITES.setFavorites(this.character);
      this.favoritesButton = 'Remove from Favorites';
    } else if (this.favoritesButton == 'Remove from Favorites') {
      FAVORITES.remove(this.character);
      this.favoritesButton = 'Add to Favorites';
    }
    let message = document.getElementById('items-favorites');
    message.textContent = `Favorites: ${FAVORITES.getFavorites()}`;
    console.log(FAVORITES);
    this.remove();
  }

  remove(){
    const modalWindowOverlay = document.getElementById("modal-overlay");
    modalWindowOverlay.style.display = 'none';
    const modal = document.getElementById('modal');
    while (modal.firstChild) {
      modal.removeChild(modal.firstChild);
    }
  }
}




{/* <div id="modal-overlay">
  <div id="modal">

    <div class="modal-content">
      <p>Modal Content</p>
    </div>

    <div class="modal-footer">
      <button id="close-modal">Close</button>
      <button>Save</button>
    </div>

  </div>
</div> */}
