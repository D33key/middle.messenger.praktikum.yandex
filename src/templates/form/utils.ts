export function getDataFromForm(event: SubmitEvent) {
	event.preventDefault();
	if (event.target && event.target instanceof HTMLFormElement) {
		const form = event.target.closest('form')!;
		const formData = new FormData(form);

		for (let [name, value] of formData) {
			console.log(`${name} = ${value}`);
		}
	}
}
