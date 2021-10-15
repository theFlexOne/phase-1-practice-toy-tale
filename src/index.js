const JSON_SERVER_API_ENDPOINT = "http://localhost:3000/toys/";

const addToyForm = document.querySelector(".add-toy-form");
const createToyBtn = document.querySelector(".submit");

class Toy {
  constructor(name = "Jessie",
   image = "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
   likes = 0
   ) {
    this.name = name;
    this.image = image;
    this.likes = likes;
  }
}

let addToy = false;


const displayCards = (cards) => {
  const toyCollection = document.querySelector("#toy-collection");
  let newHTMLState = cards.join('\n');
  toyCollection.innerHTML = newHTMLState;
} 

const buildCards = toyData => {
  // const toyCollection = document.querySelector("#toy-collection");
  const builtCards = [];
  toyData.forEach((_toy, i, toyData) => {
    const {name, image, id} = toyData[i];
    const newCard = document.createElement('DIV');
    const newCardHTML = `
      <h2>${name}</h2>
      <img src="${image}" class="toy-avatar" />
      <p>4 Likes </p>
      <button class="like-btn" id="${id}">Like <3</button>
    `;
    newCard.classList.add("card");
    newCard.innerHTML = newCardHTML;
    builtCards.unshift(newCard.outerHTML);
  })
  displayCards(builtCards)
}

const fetchToys = () => {
  fetch(JSON_SERVER_API_ENDPOINT)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return buildCards(data)
    }).catch(err => console.error(err))
    
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  addToyForm.addEventListener("submit", e => {
    debugger;
    e.preventDefault();
    fetch(JSON_SERVER_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(new Toy())
    }).then(() => fetchToys())
    .catch(err => console.error(err));
  });
  fetchToys();
});


