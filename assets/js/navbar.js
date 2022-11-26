document.addEventListener("DOMContentLoaded", () => {
	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(
		document.querySelectorAll(".navbar-burger"),
		0
	);

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {
		// Add a click event on each of them
		$navbarBurgers.forEach((el) => {
			el.addEventListener("click", () => {
				// Get the target from the "data-target" attribute
				const target = el.dataset.target;
				const $target = document.getElementById(target);

				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle("is-active");
				$target.classList.toggle("is-active");
			});
		});
	}
});

async function sendData(data, url) {
	try {
		const request = await fetch(url, {
			method: "POST",
			body: data
		});

		const result = await request.json();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

const search_form = document.getElementById("search_form");

search_form.addEventListener("submit", function (e) {
	e.preventDefault();
	console.log(e.target.query.value);

	var data = new FormData();
	data.append("query", e.target.query.value);

	sendData(data, "api.php");
});
