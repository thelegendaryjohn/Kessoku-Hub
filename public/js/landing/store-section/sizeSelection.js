const sizeBtn = document.querySelectorAll(".size-select");
let selectedSize = "M";

sizeBtn.forEach((e) => {
	e.addEventListener("click", (e) => {
		// Remove all "selected" classes in the same parent
		e.target.parentNode.querySelectorAll(".selected").forEach((e) => {
			e.classList.remove("selected");
		});

		// Add "selected" class to clicked button
		e.target.classList.add("selected");

		// Set selected size
		selectedSize = e.target.textContent;
	});
});
