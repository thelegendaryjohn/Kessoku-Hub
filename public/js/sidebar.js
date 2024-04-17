let navbarClosed = true;

const openAnim = () => {
	document.querySelector("#start").beginElement();
	navbarClosed = false;
	console.log("Open animation");
};

const closeAnim = () => {
	document.querySelector("#reverse").beginElement();
	navbarClosed = true;
	console.log("Close animation");
};

const toggleNav = () => {
	console.log("Toggle navbar");
	document.querySelector("#sidebar").classList.toggle("toggleSidebar");

	navbarClosed ? openAnim() : closeAnim();
};

const closeNav = () => {
	console.log("Close navbar");
	document.querySelector("#sidebar").classList.remove("toggleSidebar");

	if (!navbarClosed) {
		closeAnim();
	}
};

const detectIgnoredClass = (event) => {
	event.stopPropagation();
};

document.querySelector("#menu-btn").addEventListener("click", toggleNav);
document.querySelector("body").addEventListener("click", closeNav);
document.querySelectorAll(".ignoreSidebarToggle").forEach((e) => {
	e.addEventListener("click", detectIgnoredClass);
});
