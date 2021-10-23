import { combineReducers } from 'redux';
import modals from './modals';

const rootReducer = combineReducers({
  modals,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
