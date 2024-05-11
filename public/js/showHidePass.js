// Listen to the visibility icon clicks
document.querySelectorAll(".pass-visibility-img").forEach((e) => {
	e.addEventListener("click", () => {
		// Switch icons
		e.src = e.classList.contains("visible")
			? "/images/account-section/hide-icon.svg"
			: "/images/account-section/show-icon.svg";
		e.classList.toggle("visible");

		// Change input type
		const input = e.parentElement.previousElementSibling;
		input.type = input.type === "password" ? "text" : "password";
	});
});
