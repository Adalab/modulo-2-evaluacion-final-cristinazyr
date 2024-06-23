"use strict";

// QUERY SELECTOR

const charactersUl = document.querySelector(".js__charactersUl");
const favouritesUl = document.querySelector(".js__favouritesUl");
const searchButton = document.querySelector(".js__searchButton");
const characterInput = document.querySelector(".js__characterInput");

// DATOS

let data = [];
let favourites = [];

// FUNCIONES

function createLiForCharacters(oneObject) {
  const html = `
  <li class="js__characterCard characterCard" data-id="${oneObject._id}">
    <img class="onepic" src="${
      oneObject.imageUrl ||
      "https://via.placeholder.com/210x295/ffffff/555555/?text=Disney"
    }" alt="${oneObject.name}">
    <h3 class="characterName">${oneObject.name}</h3>
  </li>
`;
  return html;
}

function renderCharacters(vari) {
  let html = "";

  for (const oneObject of vari) {
    html += createLiForCharacters(oneObject);
  }

  charactersUl.innerHTML = html;

  const characterAllCards = document.querySelectorAll(".js__characterCard");

  for (const eachCardLi of characterAllCards) {
    eachCardLi.addEventListener("click", handleClickCard);
  }
}

function renderFavourites() {
  let html = "";

  for (const oneObject of favourites) {
    html += createLiForCharacters(oneObject);
  }

  favouritesUl.innerHTML = html;
}

// FUNCIONES DE EVENTOS (HANDLER)

function handleClickCard(ev) {
  const clickedCharacterId = ev.currentTarget.dataset.id;
  console.log(clickedCharacterId);

  const clickedCharacterObj = data.find(
    (eachCharacterObj) => eachCharacterObj._id === clickedCharacterId
  );

  const clickedFavoriteIndex = favourites.findIndex(
    (eachCharacterObj) => eachCharacterObj._id === clickedCharacterId
  );

  if (clickedFavoriteIndex === -1) {
    favourites.push(clickedCharacterObj);
    localStorage.setItem("favs", JSON.stringify(favourites));

    renderFavourites();
  } else {
    favourites.splice(clickedFavoriteIndex, 1);
    localStorage.setItem("favs", JSON.stringify(favourites));
    renderFavourites();
  }
  ev.currentTarget.classList.toggle("favourite");
}
function handleClickSearch(ev) {
  ev.preventDefault();

  const searchedCharacter = characterInput.value;

  const filteredData = data.filter((eachCharacterObj) =>
    eachCharacterObj.name
      .toLowerCase()
      .includes(searchedCharacter.toLowerCase())
  );

  renderCharacters(filteredData);
}

// EVENTOS

searchButton.addEventListener("click", handleClickSearch);

// CÓDIGO CUANDO CARGA LA PÁGINA

fetch("https://api.disneyapi.dev/character?pageSize=50")
  .then((response) => response.json())
  .then((dataFromFetch) => {
    console.log(dataFromFetch.data);

    data = dataFromFetch.data;

    renderCharacters(data);
  });

const favsFromLS = JSON.parse(localStorage.getItem("favs"));

if (favsFromLS !== null) {
  favourites = favsFromLS;

  renderFavourites();
}
