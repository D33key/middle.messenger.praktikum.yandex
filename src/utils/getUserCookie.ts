const setCookie = <T>(name: string, value: T, days: number) => {
	const expires = new Date();
	expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
	const serializedValue = JSON.stringify(value);
	document.cookie = `${name}=${serializedValue};expires=${expires.toUTCString()};path=/`;
};

const getCookie =(name: string) => {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith(name + '=')) {
			return JSON.parse(cookie.substring(name.length + 1));
		}
	}
	return null;
};

export { getCookie, setCookie };
