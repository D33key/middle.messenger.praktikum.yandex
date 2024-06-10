export function getDataFromForm(event: SubmitEvent) {
  event.preventDefault();
  if (event.target && event.target instanceof HTMLFormElement) {
    const form = event.target.closest('form')!;
    const formData = new FormData(form);
    const filteredFormData = new FormData();

    for (const [name, value] of formData) {
      if (value !== '') {
        filteredFormData.append(name, value);
      }
    }

    return filteredFormData;
  }
}

export function getDataFromObject(data: Record<string, string>) {
  const formData = new FormData();

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key]);
    }
  }

  for (const [name, value] of formData) {
    console.log(name, value);
  }
}
