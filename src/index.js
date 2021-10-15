const JSON_SERVER_API_ENDPOINT = "http://localhost:3000/toys/";

const addToyForm = document.querySelector(".add-toy-form");
const createToyBtn = document.querySelector(".submit");

let addToy = false;

class Toy {
  constructor(name, image, likes = 0) {
    this.name = name;
    this.image = image;
    this.likes = likes;
  }
}

const addLike = (card, id) => {
  const likes = ++card.querySelector(".likes").textContent; // I'm very proud of this line of code
  fetch(JSON_SERVER_API_ENDPOINT + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ likes })    
  })
};

const displayCards = (cards) => {
  const toyCollection = document.querySelector("#toy-collection");
  let newHTMLState = cards.join('\n');
  toyCollection.innerHTML = newHTMLState;
} 

const buildCards = toyData => {
  const builtCards = [];
  toyData.forEach((_toy, i, toyData) => {
    const {name, image, id, likes} = toyData[i];
    const newCard = document.createElement('DIV');
    const newCardHTML = `
      <h2>${name}</h2>
      <img src="${image}" class="toy-avatar" />
      <p><span class="likes">${likes}</span> Likes </p>
      <button class="like-btn" id="${id}" onclick="addLike(this.parentElement, this.id)">Like <3</button>
    `;
    newCard.innerHTML = newCardHTML;
    newCard.classList.add("card");
    // newCard.querySelector('button').addEventListener('click', (e) => {
    //   console.log(e, e.target, this);
    // });
    builtCards.unshift(newCard.outerHTML);
  })
  displayCards(builtCards)
}

const getToys = () => {
  fetch(JSON_SERVER_API_ENDPOINT)
    .then(res => res.json())
    .then(data => buildCards(data))
    .catch(err => console.error(err))
    
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
    e.preventDefault();
    const formInput = [...document.querySelectorAll('input[type="text"]')];
    const [{value: name}, {value: image}] = formInput;
    fetch(JSON_SERVER_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(new Toy(name, image))
    }).then(() => getToys())
    .catch(err => console.error(err));
  });
  getToys();
});


