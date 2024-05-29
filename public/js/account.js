const signup = document.querySelector("#signup-section");
const login = document.querySelector("#login-section");

// Focus on the username login input on DOM load
document.addEventListener("DOMContentLoaded", () => {
	document.querySelector("#username-login-input").focus();
})


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

//
async function loginRequest(body) {
	return fetch("/account/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
}

function errorAlert(element, content) {
	element.style.opacity = "1";
	element.textContent = content;
	setTimeout(() => {
		element.style.opacity = "0";
	}, 3000);
}

function clearErrorHighlight() {
	document.querySelectorAll(".input-field").forEach((element) => {
		element.classList.remove("error-highlight");
	});
	document.querySelectorAll(".form-label").forEach((element) => {
		element.classList.remove("error-label");
	});
}

// Listen to the form submission
document
	.querySelector("#login-form")
	.addEventListener("submit", async (event) => {
		event.preventDefault();
		// Create a formdata object
		let formData = new FormData(event.target);
		let response = await loginRequest({
			username: formData.get("username"),
			password: formData.get("password"),
			remember: formData.get("remember") === "on" ? true : false,
		});

		if (response.status === 200) {
			window.location.href =
				"/account/success?username=" + formData.get("username");
		} else {
			clearErrorHighlight();
			errorAlert(
				document.querySelector("#error-login-alert"),
				"Invalid username/password."
			);
		}
	});

// Register form
document
	.querySelector("#signup-form")
	.addEventListener("submit", async (event) => {
		event.preventDefault();
		// Create a formdata object
		let formData = new FormData(event.target);
		// Verify whether confirm password matches password
		if (formData.get("password") !== formData.get("confirm-password")) {
			clearErrorHighlight();
			errorAlert(
				document.querySelector("#error-signup-alert"),
				"Passwords do not match."
			);
			return false;
		}
		// Send the request
		let response = await fetch("/account/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: formData.get("username"),
				password: formData.get("password"),
			}),
		});

		if (response.status === 201) {
			// If account was successfully created, additionally log the user in
			let response = await loginRequest({
				username: formData.get("username"),
				password: formData.get("password"),
				remember: true,
			});

			if (response.status === 200) {
				window.location.href =
					"/account/success?username=" + formData.get("username");
			} else {
				clearErrorHighlight();
				errorAlert(
					document.querySelector("#error-login-alert"),
					"Invalid username/password."
				);
			}
		} else {
			let error = await response.json();
			// Handle individual errors
			if (response.status === 400) {
				clearErrorHighlight();
				error.forEach((e) => {
					errorAlert(
						document.querySelector(`#${e.path[0]}-signup-alert`),
						"Invalid " + e.path[0] + "."
					);
					document
						.querySelector(`#${e.path[0]}-signup-input`)
						.classList.add("error-highlight");
					document
						.querySelector(`#${e.path[0]}-signup-label`)
						.classList.add("error-label");
				});
			} else {
				clearErrorHighlight();
				errorAlert(
					document.querySelector("#error-signup-alert"),
					error
				);
			}
		}
	});
