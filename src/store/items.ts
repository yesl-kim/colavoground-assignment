import { createAction, ActionType, createReducer } from 'typesafe-actions';

type Count = {
  id: string;
  count: number;
};

type Item = {
  id: string;
  name: string;
  count: number;
  price: number;
};

export type ItemsState = Item[];

const initialState: ItemsState = [];

// action
const SELECT_ITEM = 'items/SELECT_ITEM';
const REMOVE_ITEM = 'items/REMOVE_ITEM';
const MODIFY_ITEM_COUNT = 'items/MODIFY_ITEM_COUNT';

export const selectItem = createAction(SELECT_ITEM)<Item>();
export const removeItem = createAction(REMOVE_ITEM)<string>();
export const modifyItemCount = createAction(MODIFY_ITEM_COUNT)<Count>();

const actions = { selectItem, removeItem, modifyItemCount };
type ItemsAction = ActionType<typeof actions>;

// reducer
const items = createReducer<ItemsState, ItemsAction>(initialState, {
  [SELECT_ITEM]: (state, action) => state.concat(action.payload),
  [REMOVE_ITEM]: (state, { payload: id }) => state.filter((item) => item.id !== id),
  [MODIFY_ITEM_COUNT]: (state, { payload }) =>
    state.map((item) => (item.id === payload.id ? { ...item, count: payload.count } : item)),
});

export default items;
