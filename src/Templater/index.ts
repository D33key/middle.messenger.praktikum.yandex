export class Templator<T> {
	protected TEMPLATE_VARIABLE_REGEXP = /\{\{(.*?)\}\}/gi;
	protected templateString: string;

	constructor(
		templateFunc: (props?: T) => string,
		templateProps?: Parameters<typeof templateFunc>[0],
	) {
		this.templateString = templateFunc(templateProps);
	}

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

	private bindEvents(html: ChildNode) {
		const elements = (html as HTMLElement).querySelectorAll('[data-event]');

		elements.forEach((element) => {
			const eventName = element.getAttribute('data-event');
			// TODO what if there will be several funcs? onPress onClick onFocus etc
			const eventFunc = element.getAttribute('data-event-function');

			if (eventName && eventFunc) {
				element.addEventListener(eventName, eval(eventFunc));
			}
		});
	}

	public compile(whereToPlace?: string) {
		const completeHtml = this.domParser(this.templateString);

		this.bindEvents(completeHtml);

		const appDiv = document.querySelector(`${whereToPlace ?? '#app'}`);

		if (appDiv) {
			appDiv.appendChild(completeHtml);
			return;
		}

		throw new Error('There is no such root element.');
	}
}
