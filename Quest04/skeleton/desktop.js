class Window {
  constructor({ root, targetElement, name = "", children = [] }) {
    this.targetElement = targetElement;
    this.root = root;
    this.children = children;
    this.name = name;
    this.draggable = false;
    this.element = document.createElement("div");
  }
  makeCloseButton() {
    const closeButton = document.createElement("button");
    closeButton.innerText = "x";
    closeButton.classList.add("close-button");
    this.element.appendChild(closeButton);
    closeButton.onclick = (e) => {
      e.stopPropagation();
      this.root.removeChild(this.element);
    };
  }
  renderChild(targetElement) {
    this.children.forEach((child) => {
      switch (child.type) {
        case "folder":
          const folder = new Folder({
            root: this.root,
            targetElement,
            children: child.children,
            name: child.name,
          });
          folder.render(targetElement);
          folder.addDoubleClickEvent();
          folder.element.classList.add("folder");
          break;
        case "icon":
          const icon = new Icon({
            root: this.root,
            targetElement,
            name: child.name,
          });
          icon.render(targetElement);
          icon.element.classList.add("icon");
          break;
      }
    });
  }
  render(targetElement, title) {
    if (title) {
      const titleElement = document.createElement("div");
      titleElement.innerText = this.name;
      titleElement.classList.add("title", "drag");
      this.element.appendChild(titleElement);
    } else {
      this.element.innerText = this.name;
      this.element.classList.add("drag");
    }
    targetElement.appendChild(this.element);
    this.addDragEvent(this.element);
  }

  addDragEvent() {
    this.element.addEventListener("mousedown", (e) => {
      if (!e.target.classList.contains("drag")) return;
      e.preventDefault();
      e.stopPropagation();
      this.draggable = true;
      this.element.style.zIndex = 2;
      this.mouseOffset = {
        x: this.element.offsetLeft - e.clientX,
        y: this.element.offsetTop - e.clientY,
      };
    });
    this.element.addEventListener("mousemove", (e) => {
      if (!e.target.classList.contains("drag")) return;
      if (!this.draggable) return;
      const newLocationX = e.clientX + this.mouseOffset.x + "px";
      const newLocationY = e.clientY + this.mouseOffset.y + "px";
      this.element.style.left = newLocationX;
      this.element.style.top = newLocationY;
      e.target.style.position = "absolute";
    });
    this.element.addEventListener("mouseleave", () => {
      this.draggable = false;
      this.element.style.zIndex = 0;
    });
    this.element.addEventListener("mouseup", (e) => {
      e.stopPropagation();
      this.draggable = false;
      this.element.style.zIndex = 0;
    });
  }
}
class Desktop extends Window {
  constructor({ root, targetElement, children }) {
    super({ root, targetElement, children });
  }
}
class Icon extends Window {
  constructor({ targetElement, name }) {
    super({ targetElement, name });
  }
}

class Folder extends Window {
  #isOpen = false;
  #openedFolder = null;
  constructor({ root, targetElement, children, name }) {
    super({ root, targetElement, children, name });
  }
  addDoubleClickEvent() {
    this.element.addEventListener("dblclick", () => {
      if (this.#isOpen && this.#openedFolder) {
        this.root.appendChild(this.#openedFolder);
        return;
      }
      if (this.#isOpen) return;
      const newWindow = new Window({
        root: this.root,
        targetElement: this.targetElement,
        name: this.name,
        children: this.children,
      });
      newWindow.render(this.root, true);
      newWindow.renderChild(newWindow.element);
      newWindow.element.classList.add("window");
      newWindow.makeCloseButton();
      this.isOpen = true;
      this.#openedFolder = newWindow.element;
    });
  }
}
