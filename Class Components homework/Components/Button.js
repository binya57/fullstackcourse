export class Button {
  constructor(content, onClick) {
    this.content = content;
    this.onClick = onClick;
  }
  render() {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = this.content;
    button.onclick = this.onClick;
    return button;
  }
}
