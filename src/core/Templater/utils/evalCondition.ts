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
          return true as unknown as string;
        }
        return JSON.stringify(variables![match as keyof T]);
      }

      return match;
    },
  );

  return Boolean(eval(evalString));
}
