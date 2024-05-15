export default function evalCondition<T extends object>(
	condition: string,
	variables: T,
) {
	const allowedVariables = Object.keys(variables);

	const evalString = condition.replace(
		/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g,
		(match) => {
			if (allowedVariables.includes(match)) {
				// Костыль
				if (typeof variables![match as keyof T] === 'object') {
					return true;
				}
				return JSON.stringify(variables![match as keyof T]);
			}

			return match;
		},
	);

	return !!eval(evalString);
}
