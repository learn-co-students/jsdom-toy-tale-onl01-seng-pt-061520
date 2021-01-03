const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollectionDiv = document.querySelector('#toy-collection')
let addToy = false;

const baseUrl = "http://localhost:3000"
const toysUrl = baseUrl + "/toys"

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
})

const formSubmitHandler = event => {
  event.preventDefault()
  const toyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0,
  }

  fetch(toysUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( toyObj )
  })
  .then( resp => resp.json() )
  .then( renderToyCard )
}

toyForm.addEventListener('submit', formSubmitHandler)

const handleLikeClick = toy => {
  fetch(toysUrl + `/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: toy.likes + 1
    })
  })
  .then( fetchAndRenderAllToys )
}

const renderToyCard = (toys) => {
  const newCard = document.createElement('div')
  newCard.className = "card"

  const headerE1 = document.createElement('h2')
  headerE1.innerText = toy.name

  const imgE1 = document.createElement('img')
  imgE1.src = toy.image
  imgE1.className = "toy-avatar"

  const pE1 = document.createElement('p')
  pE1.innerText = `${toy.likes} Likes`

  const btnE1 = document.createElement('button')
  btnE1.innerText = "Like <3"
  btnE1.className = "like-btn"
  btnE1.addEventListener('click', () => handleLikeClick(toy) )

  const HTMLE1s = [headerE1, imgE1, pE1, btnE1]
  HTMLE1s.forEach( el => newCard.appendChild(el) )

  toyCollectionDiv.appendChild( newCard )
}

const renderAllToys = (toys) => {
  toyCollectionDiv.innerHTML = ""
  toysUrl.forEach(renderToyCard)
}

const fetchAllToys = () => {
  return fetch(toysUrl)
  .then( resp => resp.json() )
}

const fetchAndRenderAllToys = () => {
  fetchAllToys().then( renderAllToys )
}

fetchAndRenderAllToys()
