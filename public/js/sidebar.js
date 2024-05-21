let navbarClosed = true;

const openAnim = () => {
	document.querySelector("#start").beginElement();
	document.querySelector("#menu-btn").classList.add("btnToggle");
	document.querySelector("#menu-btn-path").attributes[1].value = "#000000";
	navbarClosed = false;
	// console.log("Open animation");
};

const closeAnim = () => {
	document.querySelector("#reverse").beginElement();
	document.querySelector("#menu-btn").classList.remove("btnToggle");
	document.querySelector("#menu-btn-path").attributes[1].value = "#C45AFF";
	navbarClosed = true;
	// console.log("Close animation");
};

const toggleNav = () => {
	// console.log("Toggle navbar");
	document.querySelector("#sidebar").classList.toggle("toggleSidebar");
	// document.querySelector("#menu-btn").classList.toggle("btnToggle");

	navbarClosed ? openAnim() : closeAnim();
};

const closeNav = () => {
	// console.log("Close navbar");
	document.querySelector("#sidebar").classList.remove("toggleSidebar");

	if (!navbarClosed) {
		closeAnim();
	}
};

const detectIgnoredClass = (event) => {
	event.stopPropagation();
};

const handleShortcutSidebar = (event) => {
	const inputs = document.querySelectorAll("input");
	const textareas = document.querySelectorAll("textarea");

	const isInputFocused = Array.from(inputs).some(
		(input) => input === document.activeElement
	);
	const isTextareaFocused = Array.from(textareas).some(
		(textarea) => textarea === document.activeElement
	);

	if (!isInputFocused && !isTextareaFocused) {
		if (event.key === "M" || event.key === "m") {
			toggleNav();
		}
	}
};

document.querySelector("#menu-btn").addEventListener("click", toggleNav);
document.querySelector("body").addEventListener("click", closeNav);
document.querySelectorAll(".ignoreSidebarToggle").forEach((e) => {
	e.addEventListener("click", detectIgnoredClass);
});
document.addEventListener("keydown", handleShortcutSidebar);
