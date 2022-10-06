
let profilePicture = '../picture.png';

class Favorites {
  constructor(storage) {
    this.favorites = !storage ? []: storage;
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

export let FAVORITES = new Favorites(
  JSON.parse(localStorage.getItem('favorites'))
);

class Character {
  constructor(character) {
    this.name = character.name;
    this.date = character.dateOfBirth;
    this.house = character.house;
    this.wizard = character.wizard;
    this.ancestry = character.ancestry;
    this.student = character.hogwartsStudent;
    this.image = character.image === '' ? profilePicture : character.image;
  }
}

class CharacterItem {
  constructor(character) {
    this.character = character;
  }

  render() {
    const characterWrapper = document.createElement('tr');
    for (const key in this.character) {
      if (key === 'image') {
        continue;
      }
      let element = document.createElement('td');
      element.textContent =
        this.character[key] === '' ? 'No-data' : this.character[key];
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
    const renderHook = document.querySelector('tbody');
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
  constructor(character) {
    this.character = character;
    this.favoritesButton = 'Add to Favorites';
  }

  render() {
    const renderHook = document.getElementById('modal');
    const imageContainer = document.createElement('div');
    this.character.house === ''
      ? imageContainer.classList.add('image-container')
      : imageContainer.classList.add(
          this.character.house.toLowerCase(),
          'image-container'
        );
    const image = document.createElement('img');
    (image.src = this.character.image), (image.alt = 'portait');
    image.style.width = '200px';
    imageContainer.append(image);
    const infoContainer = document.createElement('table');
    infoContainer.className = 'info-container';
    for (const key in this.character) {
      if (key === 'image') {
        continue;
      }
      let row = document.createElement('tr');
      let leftRow = document.createElement('th');
      let rightRow = document.createElement('th');
      leftRow.textContent = firstLetterUpper(key);
      rightRow.textContent =
        this.character[key] === ''
          ? `No-data`
          : `${this.character[key]}`;
      row.append(leftRow, rightRow);
      infoContainer.append(row);
    }
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';
    const favoriteButton = document.createElement('button');
    favoriteButton.textContent = this.favoritesButton;
    favoriteButton.addEventListener('click', this.addToFavorites.bind(this));

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', this.remove.bind(this));
    buttonContainer.append(favoriteButton, closeButton)
    renderHook.append(
      imageContainer,
      infoContainer,
      buttonContainer
    );
    const modalWindowOverlay = document.getElementById('modal-overlay');
    modalWindowOverlay.style.display = 'flex';
  }

  addToFavorites() {
    if (this.favoritesButton == 'Add to Favorites') {
      FAVORITES.setFavorites(this.character);
      this.favoritesButton = 'Remove from Favorites';
    } else if (this.favoritesButton == 'Remove from Favorites') {
      FAVORITES.remove(this.character);
      this.favoritesButton = 'Add to Favorites';
    }
    let message = document.getElementById('items-favorites');
    message.textContent = `Favorites: ${FAVORITES.getFavorites()}`;
    this.remove();
  }

  remove() {
    const modalWindowOverlay = document.getElementById('modal-overlay');
    modalWindowOverlay.style.display = 'none';
    const modal = document.getElementById('modal');
    document.body.style.removeProperty('overflow');
    while (modal.firstChild) {
      modal.removeChild(modal.firstChild);
    }
  }
}

function firstLetterUpper(string){
  const firstLetter = string.charAt(0)
  const firstLetterCap = firstLetter.toUpperCase()
  const remainingLetters = string.slice(1)
  return firstLetterCap + remainingLetters
}