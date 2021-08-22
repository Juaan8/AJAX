(() => {
	const xhr = new XMLHttpRequest(),
		$xhr = document.getElementById("xhr"),
		$fragment = document.createDocumentFragment();


		xhr.addEventListener("readystatechange", (e) => {
			if (xhr.readyState !== 4) return;
			

			if (xhr.status >= 200 && xhr.status < 300) {
				
				console.log("exito");
				console.log(xhr.responseText);
				//$xhr.innerHTML = xhr.responseText;

				let json = JSON.parse(xhr.responseText);
				console.log(json);

				json.forEach(el => {
					const $li = document.createElement("li");
						$li.innerHTML = `${el.name}--${el.email}--${el.phone}`;
						$fragment.appendChild($li);
				});

				$xhr.appendChild($fragment);
			}else{
				console.log("error");

				let message = xhr.statusText || "ocurrio un error";
					$xhr.innerHTML = `Error ${xhr.status}: ${message}`;
			}

			console.log("Este mensaje cargara de cualquier forma");
		});

	xhr.open("GET","https://jsonplaceholder.typicode.com/users");

	xhr.send();
})();



/*--------API Fetch--------*/

(() => {
	const $fetch = document.getElementById("fetch"),
		$fragment = document.createDocumentFragment();

	fetch("https://jsonplaceholder.typicode.com/users")

	/*.then(res => {
		console.log(res);
		return res.ok ? res.text() : Promise.reject(res);
	})*/

	.then((res) => (res.ok ? res.json() : Promise.reject(res)))

	.then((json) =>{
		console.log(json);
		//$fetch.innerHTML = json;

		json.forEach((el) => {
			const $li = document.createElement("li");
			$li.innerHTML = `${el.name}--${el.email}--${el.phone}`;
			$fragment.appendChild($li);
			});

		$fetch.appendChild($fragment);
	})

	.catch((err) => {
		console.log(err);
		let message = err.statusText || "ocurrio un error";
			$fetch.innerHTML = `Error ${err.status}: ${message}`;
	})

	.finally(() => 
	console.log(
		"Este mensaje se cargara sea cual sea el resultado de la promesa fetch"
		)
	);

})();