export default function replaceEachBlocks<T extends object>(
	template: string,
	variables: T,
) {
	const EACH_REGEXP = /\{\{each\s(.*?)\}\}([\s\S]*?)\{\{endeach\}\}/gs;

	if (typeof template === 'object') return template;

	const matches = [...template.matchAll(EACH_REGEXP)].map((match) => {
		return {
			fullBlock: match[0],
			variableName: match[1].trim(),
			content: match[2].trim(),
		};
	});

	if (matches.length === 0) return template;

	matches.forEach((matchItem) => {
		template = template.replace(matchItem.fullBlock, matchItem.content.replace(',', ''));
	});
	
	return template;
}
