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
  
  fetch('http://localhost:3000/toys')
  .then(function(response) { return response.json()})
  .then(function(json) { 
        let alltoys = document.getElementById("toy-collection")
        for (const i in json) {
          let toy = document.createElement("div");
          toy.className = "card";
          alltoys.appendChild(toy);
          let toyName = document.createElement("h2");
          let image = document.createElement("img");
          image.className = "toy-avatar";
          let likes = document.createElement("p");
          let likebutton = document.createElement("button");
          likebutton.className = "like-btn"
          toyName.innerHTML = json[i]["name"];
          image.src = json[i]["image"]
          likes.innerHTML = json[i]["likes"]
          likebutton.innerText = "Like <3"
          toy.appendChild(toyName);
          toy.appendChild(image)
          toy.appendChild(likes)
          toy.appendChild(likebutton)
          likebutton.addEventListener("click", function(){
            let patcher = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
               
              body: JSON.stringify({
                "likes": parseInt(json[i]["likes"]) + 1
              })
            }
            fetch(`http://localhost:3000/toys/${json[i]["id"]}`, patcher)
            likes.innerHTML = parseInt(likes.innerHTML) + 1
            json[i]["likes"] = parseInt(json[i]["likes"]) + 1
          })
          
          
          } 
        
    }) 
    
    document.querySelector("form").addEventListener("submit", function(e) {
      
      let object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "name": document.querySelectorAll("input.input-text")[0].value, 
          "image": document.querySelectorAll("input.input-text")[1].value,
          "likes": 0
        })
      }
      console.log(object);
     fetch("http://localhost:3000/toys", object)
    .then(response => response.json())
    .then(function(object){
      console.log(object);
    })
  }, false);
  
});