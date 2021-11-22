class Window {
  constructor({ targetElement, name = "", children = [] }) {
    this.targetElement = targetElement;
    this.children = children;
    this.name = name;
    this.draggable = false;
    this.element = document.createElement("div");
    this.mouseOffset = {
      x: 0,
      y: 0,
    };
  }
  renderChild(targetElement) {
    this.children.forEach((child) => {
      switch (child.type) {
        case "folder":
          const folder = new Folder({
            targetElement,
            children: child.children,
            name: child.name,
          });
          folder.render();
          folder.doubleClick();
          folder.element.classList.add("folder");
          break;
        case "icon":
          const icon = new Icon({
            targetElement,
            name: child.name,
          });
          icon.render();
          icon.element.classList.add("icon");
          break;
      }
    });
  }
  render() {
    this.element.innerText = this.name;
    this.targetElement.appendChild(this.element);
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
  constructor({ targetElement, children }) {
    super({ targetElement, children });
  }
}
class Icon extends Window {
  constructor({ targetElement, children, name }) {
    super({ targetElement, children, name });
  }
}

class Folder extends Window {
  constructor({ targetElement, children, name }) {
    super({ targetElement, children, name });
    this.isOpen = false;
  }
  doubleClick() {
    this.element.addEventListener("dblclick", () => {
      if (this.isOpen) return;
      const newWindow = new Window({
        targetElement: this.targetElement,
        name: this.name,
        children: this.children,
      });
      newWindow.render();
      newWindow.renderChild(newWindow.element);
      newWindow.element.classList.add("window");
      this.isOpen = true;
    });
  }
}
