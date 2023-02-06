import _ from 'lodash';
import {
  DateActionType as ActionType,
  DateReducer,
  ResetDate,
  SetDate,
  PushDateEvent,
  PushDateEventList,
  DeleteDateEvent,
  DeleteDateEventList,
  UpdateDateEvent,
  UpdateDateEventList,
} from '../actions-types/dates';
import { STORAGE_NAME } from '../../utils/constants';
import Storage from '../../utils/Storage';

const initialState: DateReducer = {
  currentDate: '',
  dateEventLists: {},
  eventLists: {},
  selectedDate: '',
};

const reducer = (
  state: DateReducer = _.cloneDeep(initialState),
  actions:
    | SetDate
    | ResetDate
    | PushDateEvent
    | PushDateEventList
    | DeleteDateEvent
    | DeleteDateEventList
    | UpdateDateEvent
    | UpdateDateEventList
): DateReducer => {
  switch (actions.type) {
    case ActionType.SET: {
      if (typeof actions.payload === 'function') {
        const newState = actions.payload(state);

        return {
          ...state,
          ...newState,
        };
      }

      return {
        ...state,
        ...actions.payload,
      };
    }

    case ActionType.PUSH_DATE_EVENT_LIST: {
      const { date, list } = actions.payload;

      if (!state.dateEventLists[date]) {
        state.dateEventLists[date] = [list];

        Storage.instance.setItem(
          STORAGE_NAME.DATE_EVENT_LIST,
          JSON.stringify(state.dateEventLists)
        );

        return {
          ...state,
        };
      }

      state.dateEventLists[date] = [...state.dateEventLists[date], list];

      Storage.instance.setItem(
        STORAGE_NAME.DATE_EVENT_LIST,
        JSON.stringify(state.dateEventLists)
      );

      return {
        ...state,
      };
    }

    case ActionType.PUSH_DATE_EVENT: {
      const { date, event } = actions.payload;

      if (!state.eventLists[date]) {
        state.eventLists[date] = [event];

        Storage.instance.setItem(
          STORAGE_NAME.EVENT_LISTS,
          JSON.stringify(state.eventLists)
        );

        return {
          ...state,
        };
      }

      state.eventLists[date] = [...state.eventLists[date], event];

      Storage.instance.setItem(
        STORAGE_NAME.EVENT_LISTS,
        JSON.stringify(state.eventLists)
      );

      return {
        ...state,
      };
    }

    case ActionType.UPDATE_DATE_EVENT_LIST: {
      const { date, index, list } = actions.payload;

      if (!state.dateEventLists[date]) {
        state.dateEventLists[date] = [list];

        Storage.instance.setItem(
          STORAGE_NAME.DATE_EVENT_LIST,
          JSON.stringify(state.dateEventLists)
        );

        return {
          ...state,
        };
      }

      state.dateEventLists[date][index] = list;

      Storage.instance.setItem(
        STORAGE_NAME.DATE_EVENT_LIST,
        JSON.stringify(state.dateEventLists)
      );

      return {
        ...state,
      };
    }

    case ActionType.UPDATE_DATE_EVENT: {
      const { date, index, event } = actions.payload;

      if (!state.eventLists[date]) {
        state.eventLists[date] = [event];

        Storage.instance.setItem(
          STORAGE_NAME.EVENT_LISTS,
          JSON.stringify(state.eventLists)
        );

        return {
          ...state,
        };
      }

      state.eventLists[date][index] = event;

      Storage.instance.setItem(
        STORAGE_NAME.EVENT_LISTS,
        JSON.stringify(state.eventLists)
      );

      return {
        ...state,
      };
    }

    case ActionType.DELETE_DATE_EVENT_LIST: {
      const { date, index } = actions.payload;

      if (!state.dateEventLists[date]) {
        state.dateEventLists[date] = [];
        state.eventLists[date] = [];

        Storage.instance.setItem(
          STORAGE_NAME.DATE_EVENT_LIST,
          JSON.stringify(state.dateEventLists)
        );

        Storage.instance.setItem(
          STORAGE_NAME.EVENT_LISTS,
          JSON.stringify(state.dateEventLists)
        );

        return {
          ...state,
        };
      }

      state.dateEventLists[date].splice(index, 1);
      state.eventLists[date] = [];

      Storage.instance.setItem(
        STORAGE_NAME.DATE_EVENT_LIST,
        JSON.stringify(state.dateEventLists)
      );
      Storage.instance.setItem(
        STORAGE_NAME.EVENT_LISTS,
        JSON.stringify(state.dateEventLists)
      );

      return {
        ...state,
      };
    }

    case ActionType.DELETE_DATE_EVENT: {
      const { date, index } = actions.payload;

      if (!state.eventLists[date]) {
        state.eventLists[date] = [];

        Storage.instance.setItem(
          STORAGE_NAME.EVENT_LISTS,
          JSON.stringify(state.eventLists)
        );

        return {
          ...state,
        };
      }

      state.eventLists[date].splice(index, 1);

      Storage.instance.setItem(
        STORAGE_NAME.EVENT_LISTS,
        JSON.stringify(state.eventLists)
      );

      return {
        ...state,
      };
    }

    case ActionType.RESET: {
      return _.cloneDeep(initialState);
    }

    default: {
      return state;
    }
  }
};

export default reducer;
