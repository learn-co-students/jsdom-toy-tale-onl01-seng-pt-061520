function fetchToys() {
	return fetch(
		'http://localhost:3000/toys'
	).then(function(response) {
		return response.json();
	});
}

function makeCard(toy) {
	const cardElements = {
		name: document.createElement('h2'),
		image: document.createElement('img'),
		likes: document.createElement('p'),
		likeButton: document.createElement('button')
	}
	cardElements.name.innerText = toy.name;
	cardElements.image.src = toy.image;
	cardElements.image.class = 'toy-avatar'


	cardElements.likes.innerText = pluralize('like', toy.likes, true);
	cardElements.likeButton.class = 'like-btn';
	cardElements.likeButton.innerText = 'like';

	const card = document.createElement('div');
	card.class = 'card'
	for (element of Object.values(cardElements)) {
		card.appendChild(element)
	}

	return card;
}

function addToysToToyCollection(toyCollection) {
	return fetchToys().then(function(toys) {
		for (const toy of toys) {
			toyCollection.appendChild(makeCard(toy));
		}
		return toys;
	});
}

function addListenerToToys(toys) {
	toys.then(function(toys) {
		for (const toy of toys) {
			console.log(toy);
		}
	});
};

function toggleToyForm(toyForm) {
	if (toyForm.style.display === 'block') {
		toyForm.style.display = 'none';
	} else {
		toyForm.style.display = 'block';
	}
}

function makeToy(toyName, toyImage) {
	return {
		name: toyName,
		image: toyImage,
		likes: 0
	};
}

function postToyToToys(toy) {
	const url = 'http://localhost:3000/toys';
	const config = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify(toy)
	};
	return fetch(
		url,
		config
	).then(function(response) {
		return response.json();
	}).then(function(toy) {
		document.getElementById('toy-collection').appendChild(makeCard(toy));
	});
}


document.addEventListener('DOMContentLoaded', function() {
	document.getElementsByClassName('add-toy-form')[0].addEventListener('submit', function(e) {
		e.preventDefault();
		toggleToyForm(document.getElementsByClassName('container')[0]);
		const toyName = document.getElementsByClassName('input-text').name.value;
		const toyImage = document.getElementsByClassName('input-text').image.value;
		postToyToToys(makeToy(toyName, toyImage));
	});

	document.getElementById('new-toy-btn').addEventListener('click', function() {
		toggleToyForm(document.getElementsByClassName('container')[0]);
	});

	const toys = addToysToToyCollection(document.getElementById('toy-collection'));

	addListenerToToys(toys)
});