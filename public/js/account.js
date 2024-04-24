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
document
	.querySelector("#login-form")
	.addEventListener("submit", async (event) => {
		event.preventDefault();
		// Create a formdata object
		let formData = new FormData(event.target);
		let response = await fetch("/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: formData.get("username"),
				password: formData.get("password"),
				remember: formData.get("remember") === "on" ? true : false,
			}),
		});

		if (response.status === 200) {
			window.location.href =
				"/account/success?username=" + formData.get("username");
		} else {
			let alert = document.querySelector("#error-login-alert");
			alert.style.opacity = "1";
			alert.textContent = "Invalid username/password.";
			setTimeout(() => {
				alert.style.opacity = "0";
			}, 3000);
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
			let alert = document.querySelector("#error-signup-alert");
			alert.textContent = "Passwords do not match.";
			alert.style.opacity = "1";
			setTimeout(() => {
				alert.style.opacity = "0";
			}, 3000);
			return false;
		}
		// Send the request
		let response = await fetch("/user/register", {
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
			window.location.href =
				"/account/success?username=" + formData.get("username");
		} else {
			let error = await response.json();
			// Handle individual errors
			if (response.status === 400) {
				error.forEach((e) => {
					let alert = document.querySelector(
						`#${e.path[0]}-signup-alert`
					);
					alert.textContent = e.message;
					alert.style.opacity = "1";
					setTimeout(() => {
						alert.style.opacity = "0";
					}, 3000);
				});
			} else {
				let alert = document.querySelector("#error-signup-alert");
				alert.textContent = error;
				alert.style.opacity = "1";
				setTimeout(() => {
					alert.style.opacity = "0";
				}, 3000);
			}
		}
	});
