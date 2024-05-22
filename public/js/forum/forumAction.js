const handleShortcutForum = (event) => {
	const inputs = document.querySelectorAll("input");
	const textareas = document.querySelectorAll("textarea");

	const isInputFocused = Array.from(inputs).some(
		(input) => input === document.activeElement
	);
	const isTextareaFocused = Array.from(textareas).some(
		(textarea) => textarea === document.activeElement
	);

	if (!isInputFocused && !isTextareaFocused) {
		if (event.key === "H" || event.key === "h") {
			window.location.href = "/forum";
		}

		if (event.key === "C" || event.key === "c") {
			window.location.href = "/forum/post/create";
		}

		if (event.key === "B" || event.key === "b") {
			window.location.href = "/forum/inbox";
		}
	}
};

document.addEventListener("keydown", handleShortcutForum);
