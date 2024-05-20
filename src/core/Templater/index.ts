/* eslint-disable no-param-reassign */
import replaceEachBlocks from './utils/replaceArray';
import replaceConditions from './utils/replaceConditions';
import replaceVariables from './utils/replaceVariables';

class Shaft {
  static domParser = new DOMParser();

  constructor() {}

  static convertArrayToString<Arr, Func extends (props: Arr) => string>(
    arr: Arr[],
    template: Func,
  ) {
    return arr.map((props) => template(props)).join('');
  }

  static compile<T>(template: string, variables?: T) {
    if (variables) {
      template = replaceVariables(template, variables);
      template = replaceConditions(template, variables);
      template = replaceEachBlocks(template);
    }
    return template;
  }
}

export default Shaft;
