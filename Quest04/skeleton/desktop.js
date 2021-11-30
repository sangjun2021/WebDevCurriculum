class Button {
  #button = document.createElement("button");
  #targetElement;
  #removeElement;
  constructor({ targetElement, removeElement }) {
    this.#targetElement = targetElement;
    this.#removeElement = removeElement;
    this.#renderButton();
    this.#addRemoveListener(removeElement);
  }
  #renderButton() {
    this.#targetElement.appendChild(this.#button);
    this.#button.innerText = "x";
    this.#button.classList.add("close-button");
  }
  #addRemoveListener() {
    this.#button.addEventListener("click", (e) => {
      e.stopPropagation();
      this.#removeElement.classList.add("js-remove");
    });
  }
}
class DragHandler {
  #listenerElement;
  #targetElement;
  #mouseOffset = {};
  #mouseEvent;
  constructor({ listenerElement, targetElement }) {
    this.#targetElement = targetElement;
    this.#listenerElement = listenerElement || targetElement;
    this.#dragStartEvent();
    this.#dragEndEvent();
  }
  #dragStartEvent() {
    this.#listenerElement.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.#targetElement.classList.add("js-drag-on");
      this.#mouseOffset.x = this.#targetElement.offsetLeft - e.clientX;
      this.#mouseOffset.y = this.#targetElement.offsetTop - e.clientY;
      this.#mouseEvent = document.addEventListener("mousemove", (e) => {
        e.stopPropagation();
        if (!this.#targetElement.classList.contains("js-drag-on")) return;
        this.#targetElement.style.left = e.clientX + this.#mouseOffset.x + "px";
        this.#targetElement.style.top = e.clientY + this.#mouseOffset.y + "px";
        this.#targetElement.style.position = "absolute";
      });
    });
  }
  #dragEndEvent() {
    document.addEventListener("mouseup", () => {
      this.#targetElement.classList.remove("js-drag-on");
      this.#listenerElement.removeEventListener("mousemove", this.#mouseEvent);
    });
  }
}

class DoubleClickHanlder {
  #targetElement;
  #root;
  #newWindow;
  #name;
  #children;
  constructor({ root, targetElement, name, children = [] }) {
    this.#targetElement = targetElement;
    this.#name = name;
    this.#root = root;
    this.#children = children;
    this.#addDoubleClickEvent();
  }
  #addDoubleClickEvent() {
    this.#targetElement.addEventListener("dblclick", (e) => {
      if (this.#newWindow) {
        this.#reRenderWindow();
        return;
      }
      e.stopPropagation();
      this.#newWindow = new Window({
        targetElement: this.#root,
        name: this.#name,
        children: this.#children,
      });
    });
  }
  #reRenderWindow() {
    this.#newWindow.element.classList.remove("js-remove");
  }
}

class Position {
  #element;
  #position = {};
  constructor(element) {
    this.#element = element;
    this.#setPosition();
  }
  #setPosition() {
    this.#position.leftPosition = this.#element.offsetLeft;
    this.#position.topPosition = this.#element.offsetTop;
    setTimeout(() => {
      this.#element.style.position = "absolute";
      const { leftPosition, topPosition } = this.#position;
      this.#element.style.left = leftPosition + "px";
      this.#element.style.top = topPosition + "px";
    }, 0);
  }
}

class Children {
  #children;
  #targetElement;
  #icon;
  #folder;
  constructor({ targetElement, children = [], icon = 0, folder = 0 }) {
    this.#targetElement = targetElement;
    this.#children = children;
    this.#icon = icon;
    this.#folder = folder;
    this.#addChildren({ icon: this.#icon, folder: this.#folder });
    this.#renderChildren(this.#children);
  }
  #renderChildren(children) {
    children.forEach((child) => {
      switch (child.type) {
        case "folder":
          new Folder({
            targetElement: this.#targetElement,
            children: child.children,
            name: child.name,
          });
          break;
        case "icon":
          new Icon({
            targetElement: this.#targetElement,
            name: child.name,
          });
          break;
      }
    });
  }
  #addChildren({ icon, folder }) {
    const newIcon = new Array(icon).fill(0).map((_, index) => ({
      type: "icon",
      name: `${index}아이콘`,
    }));
    const newFolder = new Array(folder).fill(0).map((_, index) => ({
      type: "folder",
      name: `${index}폴더`,
    }));
    this.#children.push(...newFolder.concat(newIcon));
  }
}
class RenderDesktop {
  #targetElement;
  #children;
  #icon;
  #folder;
  constructor({ targetElement, children = [], icon = 0, folder = 0 }) {
    this.#targetElement = targetElement;
    this.#children = children;
    this.#icon = icon;
    this.#folder = folder;
    new Children({
      children: this.#children,
      targetElement: this.#targetElement,
      icon: this.#icon,
      folder: this.#folder,
    });
  }
}

class RenderIcon {
  #element = document.createElement("div");
  #targetElement;
  #name;
  #type = "icon";
  #dragHandler;
  constructor({ targetElement, name }) {
    this.#targetElement = targetElement;
    this.#name = name;
    this.#renderIcon({ name: this.#name, element: this.#element });
    this.#addDragEvent({ targetElement: this.#element });
  }
  #addDragEvent({ listenerElement, targetElement }) {
    this.#dragHandler = new DragHandler({ listenerElement, targetElement });
  }
  #renderIcon({ name = "", element }) {
    element.innerText = name;
    element.classList.add(this.#type);
    this.#targetElement.appendChild(element);
    new Position(this.#element);
  }
}

class RenderFolder {
  #element = document.createElement("div");
  #targetElement;
  #children;
  #type = "folder";
  #name;
  #dragHandler;
  #doubleClickHandler;
  constructor({ targetElement, name = "", children = [] }) {
    this.#targetElement = targetElement;
    this.#name = name;
    this.#children = children;
    this.#renderIcon({ name: this.#name, element: this.#element });
    this.#addDragEvent({ targetElement: this.#element });
    this.#addDoubleClickEvent({
      root: this.#targetElement,
      targetElement: this.#element,
      name: this.#name,
      children: this.#children,
    });
  }
  #renderIcon({ name = "", element }) {
    element.innerText = name;
    element.classList.add(this.#type);
    this.#targetElement.appendChild(element);
    new Position(this.#element);
  }
  #addDragEvent({ listenerElement, targetElement }) {
    this.#dragHandler = new DragHandler({ listenerElement, targetElement });
  }
  #addDoubleClickEvent({ targetElement, name, children, root }) {
    this.#doubleClickHandler = new DoubleClickHanlder({
      targetElement,
      name,
      children,
      root,
    });
  }
}

class RenderWindow {
  #element = document.createElement("div");
  #targetElement;
  #children;
  #name;
  #type = "window";
  #dragHandler;
  #button;
  constructor({ targetElement, children = [], name = "" }) {
    this.#targetElement = targetElement;
    this.#children = children;
    this.#name = name;
    this.#renderWindow({
      name: this.#name,
      element: this.#element,
      children: this.#children,
    });
    new Children({
      children: this.#children,
      targetElement: this.#element,
    });
  }
  #renderIcon({ name = "", element }) {
    element.innerText = name;
    element.classList.add(this.#type);
    this.#targetElement.appendChild(element);
    new Position(this.#element);
  }
  #addDragEvent({ listenerElement, targetElement }) {
    this.#dragHandler = new DragHandler({ listenerElement, targetElement });
  }
  #renderWindow({ name, element }) {
    this.#renderIcon({ element });
    const barElement = document.createElement("div");
    barElement.innerText = name;
    barElement.classList.add("bar");
    element.appendChild(barElement);
    this.#button = new Button({
      targetElement: barElement,
      removeElement: this.#element,
    });
    this.#addDragEvent({
      listenerElement: barElement,
      targetElement: this.#element,
    });
  }
  get element() {
    return this.#element;
  }
}

class Desktop {
  #targetElement;
  #children;
  #render;
  constructor({ targetElement, children = [], icon, folder }) {
    this.#targetElement = targetElement;
    this.#children = children;
    this.#render = new RenderDesktop({
      targetElement: this.#targetElement,
      type: "desktop",
      children: this.#children,
      icon,
      folder,
    });
  }
}
class Icon {
  #targetElement;
  #name;
  #render;
  constructor({ targetElement, name }) {
    this.#targetElement = targetElement;
    this.#name = name;
    this.#render = new RenderIcon({
      targetElement: this.#targetElement,
      name: this.#name,
      type: "icon",
    });
  }
}

class Folder {
  #targetElement;
  #children;
  #name;
  #render;
  constructor({ targetElement, children = [], name = "" }) {
    this.#targetElement = targetElement;
    this.#children = children;
    this.#name = name;
    this.#render = new RenderFolder({
      targetElement: this.#targetElement,
      name: this.#name,
      type: "folder",
      children: this.#children,
    });
  }
  get element() {
    return this.#render.element;
  }
}

class Window {
  #targetElement;
  #children;
  #name;
  #render;
  constructor({ targetElement, name = "", children = [] }) {
    this.#targetElement = targetElement;
    this.#children = children;
    this.#name = name;
    this.#render = new RenderWindow({
      targetElement: this.#targetElement,
      name: this.#name,
      type: "window",
      children: this.#children,
    });
  }
  get element() {
    return this.#render.element;
  }
}
