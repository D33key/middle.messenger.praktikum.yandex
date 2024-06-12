/* eslint-disable no-param-reassign */
import { Block } from '@/core/Block';

export default function replaceVariables<T extends object>(
  template: string,
  variables: T,
) {
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    if (value === null) {
      template = template.replace(regex, '');
      continue;
    }
    if (typeof value === 'object' && key !== 'events') {
      const regex = new RegExp(`{{\\s*${key}\\.(\\w+)\\s*}}`, 'g');
      // eslint-disable-next-line no-loop-func
      [...template.matchAll(regex)].forEach((item) => {
        const valueFromReg = item[1];
        if (Array.isArray(value[valueFromReg])) {
          const mapedValue = value[valueFromReg].map(
            (item: Block<object>[]) => {
              const innerArray = item.map(
                (innerItem) => innerItem.getContent()?.outerHTML,
              );
              return innerArray.join('');
            },
          );
          template = template.replace(item[0], mapedValue.join(''));
        } else {
          template = template.replace(item[0], String(value[valueFromReg]));
        }
      });
    }
    if (Array.isArray(value)) {
      const mapedValue = value.map((item) => item.getContent().outerHTML);
      template = template.replace(regex, mapedValue.join(''));
      continue;
    }
    // console.log(template + ' | ', value)
    template = template.replace(regex, String(value));
  }

  return template;
}
