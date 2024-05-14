export function getDataFromForm(event: SubmitEvent) {
	event.preventDefault();
	if (event.target && event.target instanceof HTMLFormElement) {
		const form = event.target.closest('form')!;
		const formData = new FormData(form);
		const filteredFormData = new FormData();

		for (let [name, value] of formData) {
			if (value !== '') {
				filteredFormData.append(name, value);
			}
		}

		for (let [name, value] of filteredFormData) {
			console.log(name, value);
		}
	}
}

export function getDataFromObject(data: Record<string, string>) {
	const formData = new FormData();

	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			formData.append(key, data[key]);
		}
	}

	for (let [name, value] of formData) {
		console.log(name, value);
	}
}
