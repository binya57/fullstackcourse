export class Label {
  constructor(label) {
    this.label = label;
  }
  render() {
    const label = document.createElement("label");
    label.innerText = this.label;
    return label;
  }
}
