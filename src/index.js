let addToy = false;
const toyURL = 'http://localhost:3000/toys'
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.getElementById("toy-collection")


function fetchToys() {
  return fetch(toyURL)
    .then(resp => resp.json())
    .then(json => renderToys(json));
}

function renderToys(toys) {
   toys.forEach(toy => {
     const div = document.createElement('div')
    div.classList.add('card');
    let h2 = document.createElement('h2')
    h2.innerHTML = toy.name
    let img = document.createElement('img')
    img.src = toy.image
    img.style.width = '100px'
    img.style.height = '100px'
    let p = document.createElement('p')
    p.innerHTML = `${toy.likes} Likes`
    let btn = document.createElement('button')
    btn.classList.add('like-btn')
    btn.innerHTML = "Like <3"
    btn.addEventListener("click", function(event) {
      updateLikes(event.target, toy.id )
    })
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(btn)
     toyCollection.appendChild(div)

   })
 }


 let toyForm = document.querySelector('.add-toy-form')
 toyForm.addEventListener('submit', function(event) {
   event.preventDefault()
   submitData(event.target)
 })

 function submitData(toy){

  let formData = {
      name: toy.name.value,
      image: toy.image.value
    }

  let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    }

    return fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
        const p = document.createElement('p')
        p.innerHTML = object.id
        document.body.appendChild(p)
        })
    .catch(function(error) {
        document.body.innerHTML = error.message
    })
}

function updateLikes(e, toyID) {
  console.log(e.parentElement)
  likesNumber = e.parentElement.children[2]
  oldNumber = e.parentElement.children[2].innerText.split(' ')[0]
  newNumber = parseInt(oldNumber) + 1

  let configObj = {
    method: 'PATCH',
    headers: 
    {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ 
      "likes": newNumber
  })
  }

   fetch(`http://localhost:3000/toys/${toyID}`, configObj)
  .then(function(response){
    return response.json()
  })
  .then(function(object){
    likesNumber.innerText = `${newNumber} likes`
  })









}





document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
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
  })
});
