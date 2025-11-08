class CounterStore {
	count = $state(0);

	readonly over10 = $derived(this.count > 10);

	readonly increment = () => void this.count++;

	readonly decrement = () => void this.count--;

	readonly reset = () => (this.count = 0);
}

export const counter = new CounterStore();
