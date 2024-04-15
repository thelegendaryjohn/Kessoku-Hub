const charBtn = document.querySelectorAll(".char-btn");
charBtn.forEach((char, index) => {
	char.addEventListener("click", () => {
		switchCharacters(char, i);
		document.querySelector(".char-card").setAttribute("activeChar", index);
	});
});

function switchCharacters(char, i) {
	charBtn.forEach((e) => {
		e.classList.remove("btn-underline");
	});
	char.classList.toggle("btn-underline");
	// Update the character card
	document.querySelector("char-name-ribbon").textContent = characters[i];
}

// Set default character to Hitori
switchCharacters(charBtn[0]);
