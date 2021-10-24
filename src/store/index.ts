import { combineReducers } from 'redux';
import modals from './modals';
import items from './items';
import discounts from './discounts';

const rootReducer = combineReducers({
  modals,
  items,
  discounts,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
