import Shaft from '../Shaft';

export default function compile<T>(template: string, variables?: T) {
	return Shaft.compile(template, variables);
}
