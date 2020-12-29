let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", event => {
        addNewToy(event)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetchToys();
});

//Fetch Toy

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toysObject => {
    toysObject.forEach(toy =>{
      renderToy(toy)
    })
  })
}

//Add a toy info card
function renderToy(toyObject) {
  const toyCollectionDiv = document.getElementById('toy-collection');

  //make a <div class="card"> for each toy and add it to the toy-collection div.
  const toyCard = document.createElement('div');
  toyCard.setAttribute('class', 'card');

  //toy name in h2 tag
  const toyName = document.createElement('h2');
  toyName.innerText = toyObject.name;
  toyCard.appendChild(toyName);//add name to card

  //toy image in img tag
  const toyImage = document.createElement('img');
  toyImage.src = toyObject.image;
  toyImage.setAttribute('class', 'toy-avatar');
  toyCard.appendChild(toyImage);//add img to card

  //shows the likes in p tag
  const toyLikes = document.createElement('p');
  toyLikes.innerText = `${toyObject.likes} Likes`;
  toyCard.appendChild(toyLikes);//add likes to card

  //make the button
  const likeBtn = document.createElement('button');
  likeBtn.setAttribute('class', 'like-btn');
  //make the like associated to toy
  likeBtn.setAttribute('id', toyObject.id)
  likeBtn.innerText = 'Like <3';
  //makes the like count
  likeBtn.addEventListener('click', event => {
    likeToy(event)
  })

  toyCard.appendChild(likeBtn);//add button to card

  toyCollectionDiv.appendChild(toyCard);// add card to all toy collection
}

//Add a Toy
function addNewToy(event) {
  event.preventDefault()//stop from reloading
  const toyFormContainer = document.querySelector(".container")

  //get name, img, and likes from toy
  let formData = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  };  
  //make configObj
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  //fetch with url and config variable
  fetch("http://localhost:3000/toys", configObj)
    .then(response => response.json())
    .then(object => {
      renderToy(object),
      toyFormContainer.style.display = "none"
    });
}

//Add Toy Likes
function likeToy(event) {
  event.preventDefault()//prevent from reloading page

  //add like
  let newLikes = parseInt(event.target.previousElementSibling.innerText) + 1
  //make the update with patch
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'likes': newLikes
    })
  };
  //show it
  fetch(`http://localhost:3000/toys/${event.target.id}`, configObj)
    .then(response => response.json())
    .then(
      event.target.previousElementSibling.innerText = `${newLikes} Likes`
    );
}  