export type DateReducer = {
  currentDate: string;
  selectedDate: string;
  dateEventLists: Record<string, Panteon.EventType[]>;
  eventLists: Record<string, Panteon.Event[]>;
};

export enum DateActionType {
  SET = 'date.set',
  RESET = 'date.reset',

  PUSH_DATE_EVENT_LIST = 'date.event-list.push',
  PUSH_DATE_EVENT = 'date.event.push',

  UPDATE_DATE_EVENT_LIST = 'date.event-list.update',
  UPDATE_DATE_EVENT = 'date.event.update',

  DELETE_DATE_EVENT_LIST = 'date.event-list.delete',
  DELETE_DATE_EVENT = 'date.event.delete',
}

export type SetDate = {
  type: DateActionType.SET;
  payload: Partial<DateReducer> | ((prev: DateReducer) => Partial<DateReducer>);
};

export type PushDateEventList = {
  type: DateActionType.PUSH_DATE_EVENT_LIST;
  payload: {
    date: string;
    list: Panteon.EventType;
  };
};

export type UpdateDateEventList = {
  type: DateActionType.UPDATE_DATE_EVENT_LIST;
  payload: {
    index: number;
    date: string;
    list: Panteon.EventType;
  };
};

export type DeleteDateEventList = {
  type: DateActionType.DELETE_DATE_EVENT_LIST;
  payload: {
    index: number;
    date: string;
  };
};

export type PushDateEvent = {
  type: DateActionType.PUSH_DATE_EVENT;
  payload: {
    date: string;
    event: Panteon.Event;
  };
};

export type UpdateDateEvent = {
  type: DateActionType.UPDATE_DATE_EVENT;
  payload: {
    index: number;
    date: string;
    event: Panteon.Event;
  };
};

export type DeleteDateEvent = {
  type: DateActionType.DELETE_DATE_EVENT;
  payload: {
    index: number;
    date: string;
  };
};

export type ResetDate = {
  type: DateActionType.RESET;
};
