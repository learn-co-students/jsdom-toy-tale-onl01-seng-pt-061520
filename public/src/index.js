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

  const toyCollection = document.querySelector('#toy-collection')

  function renderToy(toy) {
    let card = document.createElement('div')
    card.classList.add("card")
    toyCollection.appendChild(card)

    let name = document.createElement('h2')
    let img = document.createElement('img')
    let p = document.createElement('p')
    let btn = document.createElement('button')

    name.innerText = toy.name
    img.src = toy.image
    img.classList.add("toy-avatar")
    p.innerText = `${toy.likes} likes`
    btn.innerText = "Like <3"
    btn.classList.add("like-btn")
    btn.setAttribute("id", toy.id)
    btn.addEventListener("click", function(e) {
      updateLikes(e)
    })
    
    card.appendChild(name)
    card.appendChild(img)
    card.appendChild(p)
    card.appendChild(btn)
  }

  fetch('http://localhost:3000/toys')
    .then(function (response) {
      return response.json()
    })
    .then(function (json){
      for (let toy of json) {
        renderToy(toy)
      }
    });


    let toyForm = document.querySelector('.add-toy-form')
    toyForm.addEventListener('submit', function(e) {
      e.preventDefault()
      submitData(e.target)
    })

    function submitData(toy) {
      let configObj = {
        method: 'POST',
        headers: 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ 
          "name": toy.name.value,
          "image": toy.image.value,
          "likes": 0
        })
      };

      fetch("http://localhost:3000/toys", configObj)
        .then(function(response) {
          return response.json()
        })
        .then(function(object) {
          renderToy(object)
        })
        .catch(function(error) {
          console.log(error.message)
        })
    } 

    function updateLikes(e) {
      more = parseInt(e.target.previousElementSibling.innerText) + 1

      let configObj = {
        method: 'PATCH',
        headers: 
        {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({ 
          "likes": more
        })
      }

      fetch(`http://localhost:3000/toys/${e.target.id}`, configObj)
        .then(function(response) {
          return response.json()
        })
        .then(function(object) {
          e.target.previousElementSibling.innerText = `${more} likes`
        })
    }
});
