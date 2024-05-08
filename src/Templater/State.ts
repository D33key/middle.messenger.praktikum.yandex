export interface StateI<T> {
	value: T;
}

class State<T> implements StateI<T> {
	protected savedValue: T;

	constructor(initialValue: T) {
		this.savedValue = initialValue;
	}

	get value() {
		return this.savedValue;
	}

	set value(newValue: T) {
		if (Object.is(newValue, this.savedValue)) {
			return;
		}
		this.savedValue = newValue;
	}
}

export function state<Value>(initialValue: Value): StateI<Value> {
	return new State(initialValue);
}
