class Shaft {
	private template: string;
	private variables: Record<string, string | number | boolean>;

	constructor(
		template: string,
		variables: Record<string, string | number | boolean> = {},
	) {
		this.template = template;
		this.variables = variables;
	}

  render() {
    
  }
}
