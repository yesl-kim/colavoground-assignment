import { combineReducers } from 'redux';
import modals from './modals';
import items from './items';

const rootReducer = combineReducers({
  modals,
  items,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
