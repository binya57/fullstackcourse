import { Button, Input, Label, ListItem } from "./index.js";
export class List {
  constructor() {}

  addItem(item) {
    const input = document.querySelector("#newTask");
    if (!input.value) return;
    //creating elements:
    const listItem = new ListItem(item).render();
    const list = document.querySelector("ul");
    input.value = null;
    list.append(listItem);

    //storing items in session storage:
    const storage = sessionStorage;
    const savedItems = storage.getItem("list");
    if (!savedItems) {
      storage.setItem("list", JSON.stringify([item]));
    } else {
      const items = JSON.parse(savedItems);
      items.push(item);
      storage.setItem("list", JSON.stringify(items));
    }
  }

  clearAll() {
    const list = document.querySelector("ul");
    sessionStorage.removeItem("list");
    list.innerHTML = null;
  }

  render() {
    // creating base elements:
    const listWrapper = document.createElement("div");
    const list = document.createElement("ul");
    const label = new Label("your task: ").render();
    const input = new Input("text", "newTask").render();
    input.id = "newTask";
    const addButton = new Button("Add Task", () =>
      this.addItem(input.value)
    ).render();
    const clearAll = new Button("Clear", this.clearAll).render();
    clearAll.classList.add("danger");
    // creating list items if there are stored items:
    const items = JSON.parse(sessionStorage.getItem("list"));
    items &&
      items.map((item) => {
        const listItem = new ListItem(item).render();
        list.append(listItem);
      });
    listWrapper.append(list, label, input, addButton, clearAll);
    return listWrapper;
  }
}
