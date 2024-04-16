const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    console.log("Scrolling to top...");
}

document.querySelector("#footer-icon-arrow").addEventListener("click", scrollToTop);