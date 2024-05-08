import { Block } from '@/Block';

export default function replaceVariables<T extends object>(
	template: string,
	variables: T,
) {
	for (let [key, value] of Object.entries(variables)) {
		const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
		// if (value instanceof Block) {
		// 	value = value.render();
		// }
		template = template.replace(regex, String(value));
	}

	return template;
}
