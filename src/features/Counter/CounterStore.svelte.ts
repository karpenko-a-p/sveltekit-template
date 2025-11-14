export class CounterStore {
  count = $state(0);

  readonly over10 = $derived(this.count > 10);

  readonly increment = (): void => void this.count++;

  readonly decrement = (): void => void this.count--;

  readonly reset = (): void => void (this.count = 0);
}

export const counter = new CounterStore();
