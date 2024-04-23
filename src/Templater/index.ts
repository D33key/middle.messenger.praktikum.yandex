export class Templator {
	protected TEMPLATE_VARIABLE_REGEXP = /\{\{(.*?)\}\}/gi;
	protected templateString: string = '';
	protected templateVariables: Record<string, unknown> | null = null;

	constructor(
		templateString: string,
		templateVariables: Record<string, unknown>,
	) {
		this.templateString = templateString;
		this.templateVariables = templateVariables;
	}

	protected getVariable<T, U>(
		obj: Record<string, unknown>,
		path: string,
		defaultValue?: U,
	): U | undefined {
		const keys = path.split('.');

		let result: Record<string, unknown> | unknown = obj;

		for (let key of keys) {
			result = (result as Record<string, unknown>)[key];

			if (defaultValue && result === undefined) {
				return defaultValue;
			}
		}

		return (result as U) ?? defaultValue;
	}

	protected insertVarsToTemplateString() {}

	private compileText(template: any) {
		let tmpl = this.templateString;
		let key = null;
		const regExp = this.TEMPLATE_VARIABLE_REGEXP;

		while ((key = regExp.exec(tmpl))) {
			if (key[1]) {
				const tmplValue = key[1].trim();

				const data = this.getVariable(this.templateVariables!, tmplValue);
				tmpl = tmpl.replace(new RegExp(key[0], 'gi'), data as any);
			}
		}

		return tmpl;
	}

	private domParser(string: string) {
		const parser = new DOMParser();

		const result = parser.parseFromString(string, 'text/html').body.firstChild;

		return result;
	}

	public compile(ctx?: any) {
		const a = this.compileText(this.templateString);

		const completeHtml = this.domParser(a);

		document.querySelector('#app')?.appendChild(completeHtml!);
	}
}
