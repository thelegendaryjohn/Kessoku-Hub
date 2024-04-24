const signup = document.querySelector("#signup-section");
const login = document.querySelector("#login-section");

// Hide the Create Account section first
signup.style.display = "none";

// By default, hide all the alerts
document.querySelectorAll(".alert").forEach((alert) => {
	alert.style.opacity = "0";
});

// Listen to buttons to switch between Create Account and Login
function toggleSections() {
	// Play the coverup animation
	document.querySelector("#coverup-box").classList.remove("slideOut");
	document.querySelector("#coverup-box").classList.add("slideIn");
	//
	setTimeout(() => {
		document.querySelector("#coverup-box").classList.remove("slideIn");
		document.querySelector("#coverup-box").classList.add("slideOut");
		signup.style.display =
			signup.style.display === "none" ? "block" : "none";
		login.style.display = login.style.display === "none" ? "block" : "none";
	}, 300);
}
document.querySelector("#signup").addEventListener("click", toggleSections);

document.querySelector("#login").addEventListener("click", toggleSections);

// Listen to the form submission
