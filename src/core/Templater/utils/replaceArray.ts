export default function replaceEachBlocks(template: string) {
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
    // eslint-disable-next-line no-param-reassign
    template = template.replace(
      matchItem.fullBlock,
      matchItem.content.replace(',', ''),
    );
  });

  return template;
}
