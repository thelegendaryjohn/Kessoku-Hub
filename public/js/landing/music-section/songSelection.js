document.addEventListener("DOMContentLoaded", function () {
	const audio = document.getElementById("audio");
	const playPauseBtn = document.getElementById("play-pause");
	const progressContainer = document.querySelector(".progress-container");
	const progress = document.getElementById("progress");
	const currentTimeElement = document.getElementById("current-time");
	const durationElement = document.getElementById("duration");
	const volumeSlider = document.getElementById("volume-slider");
	const volumeIcon = document.getElementById("volume-icon");

	const songItems = document.querySelectorAll(".song");
	const controlBtns = document.querySelectorAll(".play-pause-btn");
	let selectedSongIndex;
	let lastVolume = 0;

	songItems.forEach((song) => {
		song.addEventListener("click", () => {
			const songIndex = song.querySelector(".song-index").textContent;
			const isSelected = song.classList.contains("selected");

			if (selectedSongIndex === songIndex && isSelected) {
				song.classList.toggle("selected");
				toggleAudioPlayPause();
			} else {
				resetAllSongs();
				song.classList.add("selected");
				selectedSongIndex = songIndex;
				loadAndPlaySong(song);
			}

			updateControlButtonState(song);
		});
	});

	playPauseBtn.addEventListener("click", () => {
		toggleAudioPlayPause();
	});

	audio.addEventListener("play", () => {
		updatePlayPauseButtonState(true);
	});

	audio.addEventListener("pause", () => {
		updatePlayPauseButtonState(false);
	});

	audio.addEventListener("timeupdate", () => {
		updateProgress();
		updateCurrentTime();
	});

	audio.addEventListener("loadedmetadata", () => {
		updateDuration();
	});

	progressContainer.addEventListener("click", (e) => {
		seekAudio(e);
	});

	volumeSlider.addEventListener("input", () => {
		audio.volume = volumeSlider.value;
		updateVolumeState();
	});

	volumeIcon.addEventListener("click", () => {
		toggleMute();
	});

	function loadAndPlaySong(song) {
		const songSrc = song.getAttribute("data-src");
		audio.src = songSrc;
		audio.play();
		playPauseBtn.setAttribute(
			"src",
			"/images/music-section/pause-button.svg"
		);
	}

	function toggleAudioPlayPause() {
		if (audio.paused) {
			audio.play();
		} else {
			audio.pause();
		}
	}

	function toggleMute() {
		if (audio.volume != 0) {
			lastVolume = audio.volume;
			audio.volume = 0;
			volumeSlider.value = 0;
			updateVolumeState();
		} else {
			audio.volume = lastVolume;
			volumeSlider.value = lastVolume;
			updateVolumeState();
		}
	}

	function updatePlayPauseButtonState(isPlaying) {
		if (isPlaying) {
			playPauseBtn.src = "/images/music-section/pause-button.svg";
			updateSelectedSongControlBtn(
				"/images/music-section/pause-icon.svg",
				"Pause"
			);
		} else {
			playPauseBtn.src = "/images/music-section/play-button.svg";
			updateSelectedSongControlBtn(
				"/images/music-section/play-icon.svg",
				"Play"
			);
		}
	}

	function updateProgress() {
		const progressPercent = (audio.currentTime / audio.duration) * 100;
		progress.style.width = `${progressPercent}%`;
	}

	function updateCurrentTime() {
		const currentMinutes = Math.floor(audio.currentTime / 60);
		const currentSeconds = Math.floor(audio.currentTime % 60);
		currentTimeElement.textContent = `${currentMinutes}:${
			currentSeconds < 10 ? "0" : ""
		}${currentSeconds}`;
	}

	function updateDuration() {
		const durationMinutes = Math.floor(audio.duration / 60);
		const durationSeconds = Math.floor(audio.duration % 60);
		durationElement.textContent = `${durationMinutes}:${
			durationSeconds < 10 ? "0" : ""
		}${durationSeconds}`;
	}

	function updateVolumeState() {
		if (volumeSlider.value == 0) {
			updateVolumeIcon("mute");
		} else if (volumeSlider.value > 0 && volumeSlider.value <= 0.5) {
			updateVolumeIcon("min");
		} else if (volumeSlider.value > 0.5) {
			updateVolumeIcon("max");
		}

		function updateVolumeIcon(state) {
			document.querySelector(
				"#volume-icon"
			).src = `/images/music-section/volume-${state}-icon.svg`;
		}
	}

	function seekAudio(e) {
		const width = progressContainer.clientWidth;
		const clickX = e.offsetX;
		const duration = audio.duration;
		audio.currentTime = (clickX / width) * duration;
	}

	function resetAllSongs() {
		controlBtns.forEach((btn) => {
			btn.src = "/images/music-section/play-icon.svg";
			btn.alt = "Play";
			btn.style.display = "none";
		});

		songItems.forEach((song) => {
			song.querySelector(".song-index").style.opacity = "1";
			song.classList.remove("selected");
		});
	}

	function updateControlButtonState(song) {
		const controlBtn = song.querySelector(".play-pause-btn");
		const songIndexElement = song.querySelector(".song-index");
		if (song.classList.contains("selected")) {
			controlBtn.style.display = "block";
			songIndexElement.style.opacity = "0";
			controlBtn.src = "/images/music-section/pause-icon.svg";
			controlBtn.alt = "Pause";
		} else {
			controlBtn.style.display = "none";
			songIndexElement.style.opacity = "1";
			controlBtn.src = "/images/music-section/play-icon.svg";
			controlBtn.alt = "Play";
		}
	}

	function updateSelectedSongControlBtn(src, alt) {
		const selectedSong = document.querySelector(".song.selected");
		if (selectedSong) {
			const controlBtn = selectedSong.querySelector(".play-pause-btn");
			controlBtn.src = src;
			controlBtn.alt = alt;
		}
	}
});
