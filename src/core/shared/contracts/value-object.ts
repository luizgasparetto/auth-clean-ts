export abstract class ValueObject<T> {
  private readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  get getValue(): T {
    return this.value;
  }

  get isValid(): boolean {
    return true;
  }
}