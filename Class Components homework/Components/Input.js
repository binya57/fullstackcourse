export class Input {
  constructor(type, name, onInput) {
    this.type = type;
    this.name = name;
    this.onInput = onInput;
  }
  render() {
    const input = document.createElement("input");
    input.type = this.type;
    input.name = this.name;
    input.oninput = this.onInput;

    return input;
  }
}
