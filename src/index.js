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
//elements
const toyCollection = document.getElementById('toy-collection')
const submit = document.querySelector('.submit')
const nameInput = document.getElementsByName('name')[0]
const imgInput = document.getElementsByName('image')[0]

//fetch toys
fetch('http://localhost:3000/toys')
 .then( res => res.json() )
 .then( function(obj) {
    obj.forEach(function(toy){ 
      createCard(toy)
    })
  })
//add toy
submit.addEventListener("click", function (e) {
  e.preventDefault()
  const toyName = nameInput.value 
  const toyImage = imgInput.value 
  fetch('http://localhost:3000/toys', createConfig(toyName, toyImage))
    .then(res => res.json())
    .then(obj => createCard(obj))
    .catch(error => alert(error))
})
function createConfig(name, image) { 
  const toyInfo = {
    name,
    image, 
    likes: 0
  } 
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyInfo)
  }
  return configObj
}


function createCard(toy) {
  const div = document.createElement('div')
  div.classList.add("card")
  const info = []
  //h2
  const h2 = document.createElement('h2')
  h2.innerHTML = toy.name
  //img
  const img = document.createElement('img')
  img.src = toy.image
  img.classList.add("toy-avatar")
  //p
  const p = document.createElement('p')
  p.innerHTML = `${toy.likes} Likes`
  //button
  const button = document.createElement('button')
  button.innerHTML = "Like"
  button.classList.add("like-btn")
  button.addEventListener('click', function(event) {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toy.name,
        image: toy.image,
        likes: toy.likes + 1
      })
    })
    .then(res => res.json())
    .then(p.innerHTML = `${toy.likes + 1} Likes`)
  })
  
  info.push(h2, img, p, button)

  appendChildren(div, info)
  toyCollection.appendChild(div)
}
function appendChildren(parent, children) {
  children.forEach(function (child) {
    parent.appendChild(child);
  })
}
//like function
function addLikes(event) {
  
}

