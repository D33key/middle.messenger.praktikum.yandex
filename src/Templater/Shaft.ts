import replaceConditions from './utils/replaceConditions';
import replaceVariables from './utils/replaceVariables';

class Shaft<T extends object> {
	private template: string;
	private variables?: T;
	private static root: HTMLElement | null = null;
	static domParser = new DOMParser();

	constructor(template: string, variables: T = {} as T) {
		this.template = template;
		this.variables = variables;
	}

	static convertArrayToString<Arr, Func extends (props: Arr) => string>(
		arr: Arr[],
		template: Func,
	) {
		return arr.map((props) => template(props)).join('');
	}

	static compile<T>(template: string, variables?: T) {
		if (variables) {
			template = replaceVariables(template, variables);
			template = replaceConditions(template, variables);
		}

		return template;
	}

	public render(root: string | HTMLElement) {
		if (typeof root === 'string') {
			const findRoot = document.querySelector(root) as HTMLElement;

			if (!findRoot) throw new Error(`There is no such root like: ${root}`);

			Shaft.root = findRoot;
		}

		if (root instanceof HTMLElement) {
			Shaft.root = root;
		}

		if (this.variables) {
			this.template = replaceVariables(this.template, this.variables);
			this.template = replaceConditions(this.template, this.variables);
		}

		const doc = Shaft.domParser.parseFromString(this.template, 'text/html').body
			.firstChild;

		if (!doc) throw new Error('Cannot create HTML from this template');

		Shaft.root?.append(doc);

		return this;
	}
}

export default Shaft;
