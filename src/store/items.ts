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
  rate?: number;
};

export type ItemsState = Item[];

const initialState: ItemsState = [];

// action
const SELECT_ITEMS = 'items/SELECT_ITEMS';
const REMOVE_ITEM = 'items/REMOVE_ITEM';
const MODIFY_ITEM_COUNT = 'items/MODIFY_ITEM_COUNT';

export const selectItems = createAction(SELECT_ITEMS)<Item[]>();
export const removeItem = createAction(REMOVE_ITEM)<string>();
export const modifyItemCount = createAction(MODIFY_ITEM_COUNT)<Count>();

const actions = { selectItems, removeItem, modifyItemCount };
type ItemsAction = ActionType<typeof actions>;

// reducer
const items = createReducer<ItemsState, ItemsAction>(initialState, {
  [SELECT_ITEMS]: (state, action) => action.payload,
  [REMOVE_ITEM]: (state, { payload: id }) => state.filter((item) => item.id !== id),
  [MODIFY_ITEM_COUNT]: (state, { payload }) =>
    state.map((item) => (item.id === payload.id ? { ...item, count: payload.count } : item)),
});

export default items;
