export class BooleanState {
  state: boolean;

  constructor(state = false) {
    this.state = $state(state);
  }

  readonly makeFalse = (): void => void (this.state = false);

  readonly makeTrue = (): void => void (this.state = true);

  readonly toggle = (): void => void (this.state = !this.state);
}
