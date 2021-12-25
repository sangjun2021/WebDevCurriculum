class Event {
  constructor() {}
  dispatch(type, data) {
    const event = new CustomEvent(type, { detail: data });
    window.dispatchEvent(event);
  }
  setEvent(type, func) {
    window.addEventListener(type, (e) => {
      func(e);
    });
  }
}

export default Event;
