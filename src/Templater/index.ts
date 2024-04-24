export class Templator<T> {
	protected TEMPLATE_VARIABLE_REGEXP = /\{\{(.*?)\}\}/gi;
	protected templateString: string;
	protected templateVariables: any;

	constructor(
		templateFunc: (props: T) => string,
		templateProps: Parameters<typeof templateFunc>[0],
		templateVariables?: any,
	) {
		this.templateString = templateFunc(templateProps);
		this.templateVariables = templateVariables;
	}

	// protected getVariable<U>(
	// 	obj: Record<string, unknown>,
	// 	path: string,
	// 	defaultValue?: U,
	// ): U | undefined {
	// 	const keys = path.split('.');

	// 	let result: typeof obj | unknown = obj;

	// 	for (let key of keys) {
	// 		result = (result as typeof obj)[key];

	// 		if (defaultValue && result === undefined) {
	// 			return defaultValue;
	// 		}
	// 	}

	// 	return (result as U) ?? defaultValue;
	// }

	// private compileText() {
	// 	let tmpl = this.templateString;
	// 	let key = null;
	// 	const regExp = this.TEMPLATE_VARIABLE_REGEXP;

	// 	while ((key = regExp.exec(tmpl))) {
	// 		if (key[1]) {
	// 			const tmplValue = key[1].trim();

	// 			const data = this.getVariable(this.templateVariables!, tmplValue);
	// 			tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data as any);
	// 		}
	// 	}

	// 	return tmpl;
	// }

	private domParser(string: string) {
		const parser = new DOMParser();

		const result = parser.parseFromString(string, 'text/html').body.firstChild;

		if (result) {
			return result;
		}

		const errorDiv = document.createElement('div');
		errorDiv.textContent = 'Error! Something wrong with parsed string.';

		return errorDiv;
	}

	public compile(whereToPlace?: string) {
		const completeHtml = this.domParser(this.templateString);

		const appDiv = document.querySelector(`${whereToPlace ?? '#app'}`);

		if (appDiv) {
			appDiv.appendChild(completeHtml);
			return;
		}

		throw new Error('There is no such root element.');
	}
}
