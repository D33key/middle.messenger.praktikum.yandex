class Shaft {
	private root: HTMLElement | null = null;
	private template: string;
	private variables?: Record<string, string | number | boolean>;
	private CONDITION_REGEXP =
		/\{\{if\s(.*?)\}\}([\s\S]*?)((?:\{\{else\sif\s(.*?)\}\}([\s\S]*?))*)((?:\{\{else\}\}([\s\S]*?))?)\{\{endif\}\}/gs;

	constructor(
		template: string,
		variables: Record<string, string | number | boolean> = {},
	) {
		this.template = template;
		this.variables = variables;
	}

	private replaceVariables() {
		for (const [key, value] of Object.entries(this.variables!)) {
			const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
			this.template = this.template.replace(regex, String(value));
		}
	}

	private replaceConditions() {
		let match: string = '';

		let isReplacementFound = false;
		const [matches] = [...this.template.matchAll(this.CONDITION_REGEXP)].map(
			(match) => {
				const elseIfBlocks = match[3].split(
					/(?=\{\{else\sif\s)|(?=\{\{else\}\})/,
				);
				const elseIfStatements = elseIfBlocks.map((block) => {
					const parts = block.match(/\{\{else\sif\s(.*?)\}\}([\s\S]*)/);

					if (!parts) return;

					return {
						condition: parts[1].trim(),
						content: parts[2].trim(),
					};
				});

				const elseContent = match[6]
					? match[6]
							.trim()
							.replace(/^\{\{else\}\}/, '')
							.trim()
					: '';

				return {
					fullCondition: match[0],
					ifCondition: match[1].trim(),
					ifContent: match[2].trim(),
					elseIfStatements: elseIfStatements,
					elseContent,
				};
			},
		);

		if (!matches) return;

		while (!isReplacementFound) {
			if (this.evalCondition(matches.ifCondition)) {
				match = matches.ifContent;
				isReplacementFound = true;
				break;
			} else if (matches.elseIfStatements.length > 0) {
				for (let item of matches.elseIfStatements) {
					if (item && this.evalCondition(item.condition)) {
						console.log(item);
						match = item.content;
						isReplacementFound = true;
						break;
					}
				}
				if (!isReplacementFound) {
					match = matches.elseContent;
					isReplacementFound = true;
				}
				break;
			} else {
				match = matches.elseContent;
				isReplacementFound = true;
			}
		}

		this.template = this.template.replace(matches.fullCondition, match);
	}

	private evalCondition(condition: string) {
		const allowedVariables = Object.keys(this.variables!);

		const evalString = condition.replace(
			/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g,
			(match) => {
				if (allowedVariables.includes(match)) {
					return JSON.stringify(this.variables![match]);
				}
				return match;
			},
		);

		return !!eval(evalString);
	}

	static convertArrayToString<Arr, Func extends (props: Arr) => string>(
		arr: Arr[],
		template: Func,
	) {
		return arr.map((props) => template(props)).join('');
	}

	public render(root: string | HTMLElement) {
		if (typeof root === 'string') {
			const findRoot = document.querySelector(root) as HTMLElement;
			if (!findRoot) throw new Error(`There is no such root like: ${root}`);

			this.root = findRoot;
		}

		if (root instanceof HTMLElement) {
			this.root = root;
		}

		if (this.variables) {
			this.replaceVariables();
		}

		this.replaceConditions();

		const parser = new DOMParser();
		const doc = parser.parseFromString(this.template, 'text/html').body
			.firstChild;

		if (!doc) throw new Error('Cannot create HTML from this template');

		this.root?.append(doc);

		return this;
	}
}

export default Shaft;
