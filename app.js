// `{"name":"Harry Potter",
// "alternate_names":[],
// "species":"human",
// "gender":"male",
// "house":"Gryffindor",
// "dateOfBirth":"31-07-1980",
// "yearOfBirth":1980,
// "wizard":true,
// "ancestry":"half-blood",
// "eyeColour":"green",
// "hairColour":"black",
// "wand":{"wood":"holly","core":"phoenix feather","length":11},
// "patronus":"stag",
// "hogwartsStudent":true,
// "hogwartsStaff":false,
// "actor":"Daniel Radcliffe",
// "alternate_actors":[],
// "alive":true,
// "image":"https://hp-api.herokuapp.com/images/harry.jpg"}`

class 

document.querySelectorAll('.api').forEach(wizard => {
  wizard.addEventListener("click", onRenderClick);
});

function onRenderClick(e) {
  getAPI(e.target.id)
    .then((data) => {
      console.log(data);
  });
}

async function getAPI(house) {
  let houseAPI = house !== 'all' ? `house/${house}` : '';
  const fetchedData = await fetch(
    `https://hp-api.herokuapp.com/api/characters/${houseAPI}`
  );
  const jsonData = await fetchedData.json();
  return jsonData;
}