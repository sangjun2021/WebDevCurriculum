import { eventType } from '../types/event';

class Event {
  dispatch(type : eventType, data) : void {
    const event = new CustomEvent(type, { detail: data });
    window.dispatchEvent(event);
  }

  setEvent(type :eventType, func : any) : void {
    window.addEventListener(type, (e) => {
      func(e);
    });
  }
}

export default Event;
