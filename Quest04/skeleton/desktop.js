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
    this.#targetElement.addEventListener("onclick", (e) => {
      e.stopPropagation();
      this.#removeElement.classList.classList.add("js-remove");
    });
  }
}

class DragHandler {
  #listenerElement;
  #targetElement;
  #mouseOffset = {};
  constructor({ listenerElement, targetElement }) {
    this.#targetElement = targetElement;
    this.#listenerElement = listenerElement || targetElement;
    this.#onMouseDown();
    this.#onMouseMove();
    this.#onMouseUp();
    this.#onMouseLeave();
  }
  #onMouseDown() {
    this.#listenerElement.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.#targetElement.classList.add("js-drag-on");
      this.#mouseOffset.x = this.#targetElement.offsetLeft - e.clientX;
      this.#mouseOffset.y = this.#targetElement.offsetTop - e.clientY;
    });
  }
  #onMouseMove() {
    this.#listenerElement.addEventListener("mousemove", (e) => {
      e.stopPropagation();
      if (!this.#targetElement.classList.contains("js-drag-on")) return;
      this.#targetElement.style.left = e.clientX + this.#mouseOffset.x + "px";
      this.#targetElement.style.top = e.clientY + this.#mouseOffset.y + "px";
      this.#targetElement.style.position = "absolute";
    });
  }
  #onMouseLeave() {
    this.#listenerElement.addEventListener("mouseleave", () => {
      this.#targetElement.classList.remove("js-drag-on");
    });
  }
  #onMouseUp() {
    this.#listenerElement.addEventListener("mouseup", () => {
      this.#targetElement.classList.remove("js-drag-on");
    });
  }
}

class DoubleClickHanlder {
  #targetElement;
  #newWindow;
  #name;
  #children;
  constructor({ targetElement, name, children = [] }) {
    this.#targetElement = targetElement;
    this.#name = name;
    this.#children = children;
    this.#addDoubleClickEvent();
  }
  #addDoubleClickEvent() {
    if (this.#newWindow) {
      this.#reRenderWindow();
      return;
    }
    this.#targetElement.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      this.#newWindow = new Window({
        targetElement: this.#targetElement,
        name: this.#name,
        children: this.#children,
      });
    });
  }
  #reRenderWindow() {
    this.#newWindow.classList.remove("js-remove");
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
      element.style.left = leftPosition + "px";
      element.style.top = topPosition + "px";
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

class Render {
  #targetElement;
  #element = document.createElement("div");
  #type;
  #dragHander;
  #name;
  constructor({ name, targetElement, type, children = [] }) {
    this.#targetElement = targetElement;
    this.#type = type;
    this.#name = name;
    switch (this.#type) {
      case "icon":
        this.#renderIcon(this.#name);
        this.#addDragEvent({ targetElement: this.#element });
        break;
      case "folder":
        this.#renderIcon(this.#name);
        this.#addDragEvent({ targetElement: this.#element });
        break;
      case "desktop":
        break;
      case "window":
        break;
    }
  }
  #renderIcon(name) {
    this.#element.innerText = name;
    this.#element.classList.add(this.#type);
    this.#targetElement.appendChild(this.#element);
  }
  #addDragEvent({ listenerElement, targetElement }) {
    this.#dragHander = new DragHandler({ listenerElement, targetElement });
  }
}

class Window {
  #targetElement;
  #children;
  #name;
  constructor({ targetElement, name = "", children = [] }) {
    this.targetElement = targetElement;
    this.children = children;
    this.name = name;
  }
}

class Folder {
  #targetElement;
  #children;
  #name;
  constructor({ targetElement, children = [], name = "" }) {
    this.#targetElement = targetElement;
    this.#children = children;
    this.#name = name;
  }
}
class Desktop {
  #targetElement;
  #children;
  constructor({ targetElement, children = [] }) {
    this.#targetElement = targetElement;
    this.#children = children;
    new Icon({ targetElement, name: "테스트" });
  }
}
class Icon {
  #targetElement;
  #name;
  #render;
  constructor({ targetElement, name }) {
    this.#targetElement = targetElement;
    this.#name = name;
    this.#render = new Render({
      targetElement: this.#targetElement,
      name: this.#name,
      type: "icon",
    });
  }
}
