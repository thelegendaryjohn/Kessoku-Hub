const song = document.querySelectorAll(".song");
const controlBtn = document.querySelectorAll(".play-pause-btn");
let selectedSongIndex;

song.forEach((e) => {
	e.addEventListener("click", (e) => {
		// Check if selected song === current song
		if (
			selectedSongIndex ===
			e.currentTarget.querySelector(".song-index").textContent
		) {
			// If TRUE

			// Toggle current song state
			e.currentTarget.classList.toggle("selected");
		} else {
			// If FALSE

			// Change all pause btn to play
			controlBtn.forEach((e) => {
				e.src = "/images/music-section/play-icon.svg";
				e.alt = "Play";
			});

            // Change all control btn's display to "none"
            controlBtn.forEach((e) => {
                e.style.display = "none";
            })

            // Change all song index elements' opacity to 1
            song.forEach((e) => {
                e.querySelector(".song-index").style.opacity = "1";
            })

			// Remove all "selected" classes in the same parent and add it to the selected song
			e.currentTarget.parentNode
				.querySelectorAll(".selected")
				.forEach((e) => {
					e.classList.remove("selected");
				});
			e.currentTarget.classList.add("selected");
		}

        // Change play/pause btn state
		const currControlBtn = e.currentTarget.querySelector(".play-pause-btn");
        const currSongIndexElement = e.currentTarget.querySelector(".song-index")
			e.currentTarget.querySelector(".song-index");
		if (e.currentTarget.classList.contains("selected")) {
            // Change play btn to pause and display to "block"
			currControlBtn.style.display = "block";
			currSongIndexElement.style.opacity = "0";
			currControlBtn.src = "/images/music-section/pause-icon.svg";
			currControlBtn.alt = "Pause";
		} else {
            // Change pause btn to play and display to "none"
            currControlBtn.style.display = "none";
            currSongIndexElement.style.opacity = "1";
			currControlBtn.src = "/images/music-section/play-icon.svg";
			currControlBtn.alt = "Play";
		}

		// Set selected song
		selectedSongIndex =
			e.currentTarget.querySelector(".song-index").textContent;
	});
});
