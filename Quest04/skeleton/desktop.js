const MakeClosebuttonMixin = (superclass) =>
  class extends superclass {
    makeCloseButton({ targetElement, root }) {
      const closeButton = document.createElement("button");
      closeButton.innerText = "x";
      closeButton.classList.add("close-button");
      targetElement.appendChild(closeButton);
      closeButton.onclick = (e) => {
        e.stopPropagation();
        root.removeChild(targetElement);
      };
    }
  };
const RenderChildMixin = (superclass) =>
  class extends superclass {
    renderChild({ targetElement, children, root }) {
      children.forEach((child) => {
        switch (child.type) {
          case "folder":
            const folder = new Folder({
              root,
              targetElement,
              children: child.children,
              name: child.name,
              type: child.type,
            });
            folder.render({
              targetElement,
              element: folder.element,
              name: folder.name,
              func: folder.addDragEvent,
              menubar: false,
            });
            folder.addDoubleClickEvent({
              targetElement,
              name: folder.name,
              children: folder.children,
              element: folder.element,
              root: folder.root,
              openedFolder: folder.openedFolder,
            });
            folder.element.classList.add("folder");
            folder.setPosition({
              position: folder.position,
              element: folder.element,
            });
            break;
          case "icon":
            const icon = new Icon({
              targetElement,
              name: child.name,
              type: child.type,
            });
            icon.render({
              targetElement,
              element: icon.element,
              name: icon.name,
              func: icon.addDragEvent,
              menubar: false,
            });
            icon.element.classList.add("icon");
            icon.setPosition({
              position: icon.position,
              element: icon.element,
            });
            break;
        }
      });
    }
  };

const RenderMixin = (superClass) =>
  class extends superClass {
    render({ targetElement, element, name, func, menubar }) {
      if (menubar) {
        const titleElement = document.createElement("div");
        titleElement.innerText = name;
        titleElement.classList.add("title", "js-drag");
        element.appendChild(titleElement);
        func({ element: titleElement, targetElement: element });
      } else {
        element.innerText = name;
        element.classList.add("js-drag");
        func({ element, targetElement: element });
      }
      targetElement.appendChild(element);
    }
  };

const SetPositionMixin = (superClass) =>
  class extends superClass {
    setPosition({ position, element }) {
      position.leftPosition = element.offsetLeft;
      position.topPosition = element.offsetTop;
      setTimeout(() => {
        element.style.position = "absolute";
        const { leftPosition, topPosition } = position;
        element.style.left = leftPosition + "px";
        element.style.top = topPosition + "px";
      }, 0);
    }
  };

const AddDragEventMixin = (superClass) =>
  class extends superClass {
    addDragEvent({ element, targetElement }) {
      const mouseOffset = {};
      element.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!e.target.classList.contains("js-drag")) return;
        targetElement.classList.add("js-drag-on");
        targetElement.style.zIndex = 2;
        mouseOffset.x = targetElement.offsetLeft - e.clientX;
        mouseOffset.y = targetElement.offsetTop - e.clientY;
      });
      element.addEventListener("mousemove", (e) => {
        e.stopPropagation();
        if (!e.target.classList.contains("js-drag")) return;
        if (!targetElement.classList.contains("js-drag-on")) return;
        targetElement.style.left = e.clientX + mouseOffset.x + "px";
        targetElement.style.top = e.clientY + mouseOffset.y + "px";
        targetElement.style.position = "absolute";
      });
      element.addEventListener("mouseleave", () => {
        targetElement.classList.remove("js-drag-on");
        targetElement.style.zIndex = 0;
      });
      element.addEventListener("mouseup", () => {
        targetElement.classList.remove("js-drag-on");
        targetElement.style.zIndex = 0;
      });
    }
  };

const AutoRenderMixin = (superClass) =>
  class extends superClass {
    autoRender({ folder, icon, children, renderChild, targetElement, root }) {
      const folderNumber = folder;
      const iconNumber = icon;
      const newFolder = new Array(folderNumber).fill(0).map((_, index) => ({
        type: "folder",
        name: `${index}폴더`,
      }));
      const newIcon = new Array(iconNumber).fill(0).map((_, index) => ({
        type: "icon",
        name: `${index}아이콘`,
      }));
      children.push(...newFolder.concat(newIcon));
      renderChild({ targetElement, children, root });
    }
  };
const AddDoubleClickEventMixin = (superClass) =>
  class extends superClass {
    addDoubleClickEvent({ name, children, element, root, openedFolder }) {
      element.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        if (openedFolder.length) {
          root.appendChild(openedFolder[0]);
          return;
        }
        const newWindow = new Window({
          targetElement: root,
          name,
          children,
        });
        newWindow.element.classList.add("window");
        newWindow.render({
          targetElement: root,
          name,
          element: newWindow.element,
          func: newWindow.addDragEvent,
          menubar: true,
        });
        newWindow.renderChild({
          root,
          targetElement: newWindow.element,
          children,
        });
        newWindow.makeCloseButton({ targetElement: newWindow.element, root });
        openedFolder[0] = newWindow.element;
      });
    }
  };
class WindowBasic {
  constructor({ targetElement, name = "", children = [] }) {
    this.targetElement = targetElement;
    this.children = children;
    this.name = name;
    this.element = document.createElement("div");
  }
}
class FolderBasic {
  constructor({ root, targetElement, children = [], name = "" }) {
    this.targetElement = targetElement;
    this.root = root || targetElement;
    this.children = children;
    this.name = name;
    this.element = document.createElement("div");
    this.openedFolder = [];
    this.position = {};
  }
}
class DesktopBasic {
  constructor({ root, targetElement, children = [], folder = 0, icon = 0 }) {
    this.targetElement = targetElement;
    this.root = root || targetElement;
    this.children = children;
    this.icon = icon;
    this.folder = folder;
  }
}
class IconBasic {
  constructor({ targetElement, name }) {
    this.targetElement = targetElement;
    this.name = name;
    this.element = document.createElement("div");
    this.position = {};
  }
}

class Window extends RenderMixin(
  RenderChildMixin(AddDragEventMixin(MakeClosebuttonMixin(WindowBasic)))
) {}

class Folder extends RenderMixin(
  AddDragEventMixin(AddDoubleClickEventMixin(SetPositionMixin(FolderBasic)))
) {}

class Desktop extends AutoRenderMixin(RenderChildMixin(DesktopBasic)) {}

class Icon extends RenderMixin(
  AddDragEventMixin(SetPositionMixin(IconBasic))
) {}

// const compose =
//   (...args) =>
//   (Base) =>
//     class extends args.reduce((a, f) => f(a), Base) {};

// const Winodw = compose(
//   MakeClosebuttonMixin,
//   AddDragEventMixin,
//   RenderChildMixin
// )(WindowBasic);

// const Folder = compose(
//   SetPositionMixin,
//   AddDragEventMixin,
//   AddDoubleClickEventMixin
// )(FolderBasic);

// const Desktop = compose(RenderChildMixin, AutoRenderMixin)(DesktopBasic);

// const Icon = compose(SetPositionMixin, AddDragEventMixin)(IconBasic);
