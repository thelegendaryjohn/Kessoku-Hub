document.querySelectorAll(".pass-visibility").forEach((e) => {
    e.addEventListener("click", () => {
        passVisibility(e);
    });
})

function passVisibility(element) {
    // Switch icons
    element.src = (element.classList.contains("visible")) ? "/images/account-section/hide-icon.svg" : "/images/account-section/show-icon.svg";
    element.classList.toggle("visible");

    // Change input type
    const input = element.previousElementSibling;
    input.type = (input.type === "password") ? "text" : "password";
}

