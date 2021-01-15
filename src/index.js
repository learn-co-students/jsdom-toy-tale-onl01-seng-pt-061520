const toyUrl = 'http://localhost:3000/toys'
const headers = {"Content-Type": "application/json", "Accept": "application/json"}
const collection = document.getElementById('toy-collection')
const submit = document.querySelector('.submit')
const nameForm = document.getElementById('name-input')
const imageForm = document.getElementById('image-input')
let addToy = false;

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
});

document.addEventListener("DOMContentLoaded", () => {
    fetch(toyUrl)
    .then(response => response.json())
    .then(function(result) {
      result.forEach(i => createToyCard(i))
    })
    .catch(function(error){
      alert("There was an error finding the toys!");
      console.log(error.message);
    })
})

function createToyCard(info) {
  let card = document.createElement('div')
  card.className = 'card'
  card.id = info['id']

  let name = document.createElement('h2')
  name.innerText = info['name']
  card.appendChild(name)

  let img = document.createElement('img')
  img.src = info['image']
  card.appendChild(img)

  let likes = document.createElement('p')
  likes.innerText = `${info['likes']} Likes`
  card.appendChild(likes)

  let button = document.createElement('button')
  button.className = 'like-btn'
  button.innerText = 'Like <3'
  card.appendChild(button)
  addLikeButton(button)

  collection.appendChild(card)
}

function submitToy(toyName, toyPic, toyLikes) {
  let config = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({name: toyName, image: toyPic, likes: toyLikes})
}

  return fetch(toyUrl, config)
  .then(response => response.json())
  .then(function(result) {
    createToyCard(result)
  })
  .catch(function(error){ 
    alert("There was an error submitting the toy!");
    console.log(error.message);
  })
}

submit.addEventListener("click", function(event) {
  event.preventDefault()
  submitToy(nameForm.value, imageForm.value, "0")
})

function addLikeButton(button) {
  button.addEventListener("click", () => {
    let card = button.parentElement
    let likeElement = card.children[2]
    let numberOfLikes = parseInt(likeElement.innerText.split(" ")[0])
    numberOfLikes++
    likeElement.innerText = `${numberOfLikes} Likes`
    submitLikes(card.id, numberOfLikes)
  })
}

function submitLikes(id, newLikes) {
  let config = {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify({likes: newLikes})
}

  return fetch(`http://localhost:3000/toys/${id}`, config)
  .then(response => response.json())
  .then(function(result) {
    alert("Liked!")
  })
  .catch(function(error){ 
    alert("There was an error submitting the toy!");
    console.log(error.message);
  })
}