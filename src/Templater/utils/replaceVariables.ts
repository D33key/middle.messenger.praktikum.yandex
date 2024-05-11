export default function replaceVariables<T extends object>(
	template: string,
	variables: T,
) {
	for (let [key, value] of Object.entries(variables)) {
		const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
		template = template.replace(regex, String(value));
	}
	
	return template;
}
