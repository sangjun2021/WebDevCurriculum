class Window {
  constructor({ root, targetElement, name = "", children = [] }) {
    this.targetElement = targetElement;
    this.root = root;
    this.children = children;
    this.name = name;
    this.draggable = false;
    this.element = document.createElement("div");
    this.mouseOffset = {
      x: 0,
      y: 0,
    };
  }
  makeCloseButton() {
    const closeButton = document.createElement("button");
    closeButton.innerText = "x";
    this.element.appendChild(closeButton);
    closeButton.onclick = () => {
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
          folder.doubleClick();
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
  render(targetElement) {
    this.element.innerText = this.name;
    targetElement.appendChild(this.element);
    this.addDragEvent(this.element);
  }

  addDragEvent() {
    this.element.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.mouseOffset = {
        x: e.target.offsetLeft - e.clientX,
        y: e.target.offsetTop - e.clientY,
      };
      this.draggable = true;
      this.element.style.zIndex = 2;
    });
    this.element.addEventListener("mousemove", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!this.draggable) return;
      e.target.style.position = "absolute";
      const newLocationX = e.clientX + this.mouseOffset.x + "px";
      const newLocationY = e.clientY + this.mouseOffset.y + "px";
      e.target.style.left = newLocationX;
      e.target.style.top = newLocationY;
    });
    this.element.addEventListener("mouseleave", () => {
      this.draggable = false;
      this.element.style.zIndex = 0;
    });
    this.element.addEventListener("mouseup", () => {
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
  constructor({ targetElement, children, name }) {
    super({ targetElement, children, name });
  }
}

class Folder extends Window {
  constructor({ root, targetElement, children, name }) {
    super({ root, targetElement, children, name });
    this.isOpen = false;
    this.openedFolder = null;
  }
  doubleClick() {
    this.element.addEventListener("dblclick", () => {
      if (this.isOpen && this.openedFolder) {
        this.root.appendChild(this.openedFolder);
        return;
      }
      if (this.isOpen) return;
      const newWindow = new Window({
        root: this.root,
        targetElement: this.targetElement,
        name: this.name,
        children: this.children,
      });
      newWindow.render(this.root);
      newWindow.renderChild(newWindow.element);
      newWindow.element.classList.add("window");
      newWindow.makeCloseButton();
      console.log(this.targetElement, newWindow.element);
      this.isOpen = true;
      this.openedFolder = newWindow.element;
    });
  }
}
