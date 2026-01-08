export class BooleanState {
  state: boolean;

  constructor(state = false) {
    this.state = $state(state);
  }

  makeFalse(): void {
    this.state = false;
  }

  makeTrue(): void {
    this.state = true;
  }

  toggle(): void {
    this.state = !this.state;
  }
}
