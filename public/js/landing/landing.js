const charBtn = document.querySelectorAll(".char-btn");
// Set up a click event listener for each character button
charBtn.forEach((char, i) => {
	char.addEventListener("click", () => {
		switchCharacters(char, i);
	});
});

// Function to switch characters
function switchCharacters(char, i) {
	// Remove underline from all buttons and add it to the clicked button
	charBtn.forEach((e) => {
		e.classList.remove("btn-underline");
	});
	char.classList.toggle("btn-underline");
	// Elements
	let ribbon = document.querySelector("#band-ribbon");
	let banner = document.querySelector("#char-name-ribbon");
	let card = document.querySelector("#card-text-container");
	let charImg = document.querySelector("#char-img");
	let charLayer = document.querySelector("#char-img-layer");
	let charHeads = document.querySelector(".char-heads");
	// Play animations to close the current character card.
	// There's not exactly a way around this lengthy approach,
	// as we need to play the animations in sequence, and we can't
	// do that with a single class change.
	ribbon.classList.remove("ribbon-clip-in");
	ribbon.classList.add("ribbon-clip-out");
	banner.classList.remove("banner-slide-in");
	banner.classList.add("banner-slide-out");
	card.classList.remove("card-slide-in");
	card.classList.add("card-slide-out");
	charImg.classList.remove("character-slide-in");
	charImg.classList.add("character-slide-out");
	charLayer.classList.remove("character-slide-in");
	charLayer.classList.add("character-slide-out");
	charHeads.classList.remove("character-slide-in");
	charHeads.classList.add("character-slide-out");
	// Update the character card info
	setTimeout(() => {
		document.querySelector("#char-name").textContent = characters[i].name;
		document.querySelector("#char-desc").textContent = characters[i].desc;
		document.querySelector("#char-role").textContent = characters[i].role;
		document.querySelector("#char-va").textContent = characters[i].va;
		banner.textContent = characters[i].name.toUpperCase();
		// Change the image sources
		charImg.src = `/images/character-section/character/${characters[i].id}.png`;
		charLayer.src = `/images/character-section/character/${characters[i].id}-layer.png`;
		charHeads.src = `/images/character-section/character/${characters[i].id}-3pics.png`;
		// Update the header, ribbon and char name color
		let color = `var(--${characters[i].id}-color)`;
		document.querySelector("#char-name").style.color = color;
		document.querySelector("#char-header").style.color = color;
		ribbon.style.backgroundColor = color;
		// Play animations to open the new character card
		ribbon.classList.remove("ribbon-clip-out");
		ribbon.classList.add("ribbon-clip-in");
		banner.classList.remove("banner-slide-out");
		banner.classList.add("banner-slide-in");
		card.classList.remove("card-slide-out");
		card.classList.add("card-slide-in");
		charImg.classList.remove("character-slide-out");
		charImg.classList.add("character-slide-in");
		charLayer.classList.remove("character-slide-out");
		charLayer.classList.add("character-slide-in");
		charHeads.classList.remove("character-slide-out");
		charHeads.classList.add("character-slide-in");
	}, 200);
}

// Set default character to Hitori
switchCharacters(charBtn[0], 0);
