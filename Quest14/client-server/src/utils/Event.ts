import { eventNameType, eventType } from '../types/event.d.ts';

class Event implements eventType {
  dispatch(type : eventNameType, data : any) : void {
    const event = new CustomEvent(type, { detail: data });
    window.dispatchEvent(event);
  }

  setEvent(type :eventNameType, func : any) : void {
    window.addEventListener(type, (e : any) => {
      func(e);
    });
  }
}

export default Event;
