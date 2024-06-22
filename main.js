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
  // Aquí asumimos que oneObject.imageUrl es una única URL de imagen
  const html = `
      <div class="js__characterCard characterCard" data-id="${oneObject._id}">
        <img src="${
          oneObject.imageUrl ||
          "https://via.placeholder.com/210x295/ffffff/555555/?text=Disney"
        }" alt="${oneObject.name}">
        <h3>${oneObject.name}</h3>
      </div>
    `;
  return html;
}

function renderCharacters(data) {
  let html = "";

  for (const oneObject of data) {
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
