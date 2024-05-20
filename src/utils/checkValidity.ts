export default function checkValidity(str: string, regExp?: RegExp) {
  if (!regExp) {
    return true;
  }

  if (regExp.test(str)) {
    return true;
  }

  return false;
}
