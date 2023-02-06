import { AppDispatch } from '..';
import { DateActionType, DateReducer } from '../actions-types/dates';

export const setDate =
  (
    payload:
      | Partial<DateReducer>
      | ((prev: DateReducer) => Partial<DateReducer>)
  ) =>
  (dispatch: AppDispatch) =>
    dispatch({
      type: DateActionType.SET,
      payload,
    });

export const pushDateEventList =
  (payload: { date: string; name: string }) => (dispatch: AppDispatch) =>
    dispatch({
      type: DateActionType.PUSH_DATE_EVENT_LIST,
      payload,
    });

export const pushDateEvent =
  (payload: { date: string; event: Panteon.Event }) =>
  (dispatch: AppDispatch) =>
    dispatch({
      type: DateActionType.PUSH_DATE_EVENT,
      payload,
    });

export const updateDateEventList =
  (payload: { index: number; date: string; name: Panteon.EventType }) =>
  (dispatch: AppDispatch) =>
    dispatch({
      type: DateActionType.UPDATE_DATE_EVENT_LIST,
      payload,
    });

export const updateDateEvent =
  (payload: { date: string; event: Panteon.Event; index: number }) =>
  (dispatch: AppDispatch) =>
    dispatch({
      type: DateActionType.UPDATE_DATE_EVENT,
      payload,
    });

export const deleteDateEventList =
  (payload: { index: number; date: string }) => (dispatch: AppDispatch) =>
    dispatch({
      type: DateActionType.DELETE_DATE_EVENT_LIST,
      payload,
    });

export const deleteDateEvent =
  (payload: { date: string; index: number }) => (dispatch: AppDispatch) =>
    dispatch({
      type: DateActionType.DELETE_DATE_EVENT,
      payload,
    });

export const resetDate = () => (dispatch: AppDispatch) =>
  dispatch({ type: DateActionType.RESET });
