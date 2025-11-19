export class BooleanState {
  constructor(private _value = false) {}

  get value(): boolean {
    return this._value;
  }

  makeFalse(): void {
    this._value = false;
  }

  makeTrue(): void {
    this._value = true;
  }

  toggle(): void {
    this._value = !this._value;
  }
}
