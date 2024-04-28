const song = document.querySelectorAll(".song");
let selectedSongIndex;

song.forEach((e) => {
	e.addEventListener("click", (e) => {
		// Check if selected song === current song
		if (
			selectedSongIndex ===
			e.currentTarget.querySelector(".song-index").textContent
		) {
			// Toggle current song state if True
			e.currentTarget.classList.toggle("selected");
		} else {
			// Remove all "selected" classes in the same parent and add it to the selected song if False
			e.currentTarget.parentNode
				.querySelectorAll(".selected")
				.forEach((e) => {
					e.classList.remove("selected");
				});
			e.currentTarget.classList.add("selected");
		}

		// Set selected song
		selectedSongIndex =
			e.currentTarget.querySelector(".song-index").textContent;
	});
});
