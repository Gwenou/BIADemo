import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  loadSuccess,
  loadAllByPostSuccess,
  loadAllByPost,
  load,
  failure
} from './notifications-actions';
import { LazyLoadEvent } from 'primeng/api';
import { Notification } from '../model/notification';

// This adapter will allow is to manipulate notifications (mostly CRUD operations)
export const notificationsAdapter = createEntityAdapter<Notification>({
  selectId: (notification: Notification) => notification.id,
  sortComparer: false
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<Notification> {
//   ids: string[] | number[];
//   entities: { [id: string]: Notification };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects

export interface State extends EntityState<Notification> {
  // additional props here
  totalCount: number;
  currentNotification: Notification;
  lastLazyLoadEvent: LazyLoadEvent;
  loadingGet: boolean;
  loadingGetAll: boolean;
}

export const INIT_STATE: State = notificationsAdapter.getInitialState({
  // additional props default values here
  totalCount: 0,
  currentNotification: <Notification>{},
  lastLazyLoadEvent: <LazyLoadEvent>{},
  loadingGet: false,
  loadingGetAll: false,
});

export const notificationReducers = createReducer<State>(
  INIT_STATE,
  on(loadAllByPost, (state, { event }) => {
    return { ...state, loadingGetAll: true };
  }),
  on(load, (state) => {
    return { ...state, loadingGet: true };
  }),
  on(loadAllByPostSuccess, (state, { result, event }) => {
    const stateUpdated = notificationsAdapter.setAll(result.data, state);
    stateUpdated.totalCount = result.totalCount;
    stateUpdated.lastLazyLoadEvent = event;
    stateUpdated.loadingGetAll = false;
    return stateUpdated;
  }),
  on(loadSuccess, (state, { notification }) => {
    return { ...state, currentNotification: notification, loadingGet: false };
  }),
  on(failure, (state, { error }) => {
    return { ...state, loadingGetAll: false, loadingGet: false };
  }),
);

export const getNotificationById = (id: number) => (state: State) => state.entities[id];
