import evalCondition from './evalCondition';

export default function replaceConditions<T extends object>(
	template: string,
	variables: T,
) {
	const CONDITION_REGEXP =
		/\{\{if\s(.*?)\}\}([\s\S]*?)((?:\{\{else\sif\s(.*?)\}\}([\s\S]*?))*)((?:\{\{else\}\}([\s\S]*?))?)\{\{endif\}\}/gs;

	let match: string = '';

	let isReplacementFound = false;

	if(typeof template === 'object') return template;

	const [matches] = [...template.matchAll(CONDITION_REGEXP)].map((match) => {
		const elseIfBlocks = match[3].split(/(?=\{\{else\sif\s)|(?=\{\{else\}\})/);
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
	});

	if (!matches) return template;

	while (!isReplacementFound) {
		if (evalCondition(matches.ifCondition, variables)) {
			match = matches.ifContent;
			isReplacementFound = true;
			break;
		} else if (matches.elseIfStatements.length > 0) {
			for (let item of matches.elseIfStatements) {
				if (item && evalCondition(item.condition, variables)) {
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

	template = template.replace(matches.fullCondition, match);

	return template;
}
