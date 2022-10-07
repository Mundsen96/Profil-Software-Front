export async function getAPI(house) {
  let houseAPI = house !== 'all' ? `house/${house}` : '';
  const fetchedData = await fetch(
      `https://hp-api.herokuapp.com/api/characters/${houseAPI}`
  );
  const jsonData = await fetchedData.json();
  console.log(jsonData);
  return jsonData;
}

export function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
      if (a[key] === "") {
          return 1;
      } else if (b[key] === "") {
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
              (order === 'desc') ? (comparison * -1) : (order === 'asc') ? comparison : 0
          );
      }
  };
}

export default function clearTable(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}

function createDate(string) {
  const [day, month, year] = string.split('-');
  const date = new Date(+year, month - 1, +day);
  return date;
}


export function firstLetterUpper(string) {
  const firstLetter = string.charAt(0)
  const firstLetterCap = firstLetter.toUpperCase()
  const remainingLetters = string.slice(1)
  return firstLetterCap + remainingLetters
}