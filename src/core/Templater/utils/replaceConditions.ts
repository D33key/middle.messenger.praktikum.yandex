import evalCondition from './evalCondition';
import replaceEachBlocks from './replaceArray';
import replaceVariables from './replaceVariables';

export default function replaceConditions<T extends object>(
	template: string,
	variables: T,
) {
	const CONDITION_REGEXP =
		/\{\{if\s(.*?)\}\}([\s\S]*?)((?:\{\{else\sif\s(.*?)\}\}([\s\S]*?))*)((?:\{\{else\}\}([\s\S]*?))?)\{\{endif\}\}/gs;

	let match: string = '';

	if (typeof template === 'object') return template;

	const matches = [...template.matchAll(CONDITION_REGEXP)].map((match) => {
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

	if (matches.length === 0) return template;

	matches.forEach((matchItem) => {
		let isReplacementFound = false;
		while (!isReplacementFound) {
			if (evalCondition(matchItem.ifCondition, variables)) {
				match = matchItem.ifContent;
				isReplacementFound = true;
				break;
			} else if (matchItem.elseIfStatements.length > 0) {
				for (let item of matchItem.elseIfStatements) {
					if (item && evalCondition(item.condition, variables)) {
						match = item.content;
						isReplacementFound = true;
						break;
					}
				}
				if (!isReplacementFound) {
					match = matchItem.elseContent;
					isReplacementFound = true;
				}
				break;
			} else {
				match = matchItem.elseContent;
				isReplacementFound = true;
			}
		}
		const isIncludeVariables = match.match(/{{[^}]+}}/g);
		if (isIncludeVariables) {
			template = replaceVariables(match, variables);
			template = replaceEachBlocks(match);
		} else {
			template = template.replace(matchItem.fullCondition, match);
		}
	});

	return template;
}
