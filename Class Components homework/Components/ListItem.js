import { Button, Input } from "./index.js";

export class ListItem {
  constructor(item) {
    this.item = item;
  }

  removeItem(item, value) {
    item.remove();
    const items = JSON.parse(sessionStorage.getItem("list"));
    const filteredItems = items.filter((item) => item != value);
    sessionStorage.setItem("list", JSON.stringify(filteredItems));
  }

  checkItem(item) {
    if (item.style.textDecoration) {
      item.style.textDecoration = "";
      return;
    }
    item.style.textDecoration = "line-through";
  }

  render() {
    const liWrapper = document.createElement("div");
    const li = document.createElement("li");
    const remove = new Button("X", () =>
      this.removeItem(liWrapper, li.innerText)
    ).render();
    remove.classList.add("danger");
    const checked = new Input("checkbox", "done", () =>
      this.checkItem(li)
    ).render();
    li.innerText = this.item;
    liWrapper.append(li, checked, remove);
    return liWrapper;
  }
}
