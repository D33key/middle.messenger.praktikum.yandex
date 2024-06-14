/* eslint-disable no-useless-escape */
export default function sanitizeInput(input: string) {
  const symbols = /[&<>"'\/\\]/g;
  const replacements: Record<string, string> = {
    '<': '',
    '>': '',
  };
  return input.replace(symbols, (match) => replacements[match]);
}
