class Event {
  constructor() {}
  dispatch(type, payLoad) {
    const event = new CustomEvent(type, payLoad);
    window.dispatchEvent(event);
  }
  addEventListener(type, func) {
    window.addEventListener(type, (e) => {
      func(e);
    });
  }
}

export default Event;
