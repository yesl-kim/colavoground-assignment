import { createAction, ActionType, createReducer } from 'typesafe-actions';

export type Discount = {
  id: string;
  name: string;
  rate: number;
};

export type DiscountsState = Discount[];

const initialState: DiscountsState = [];

// action
const SELECT_DISCOUNTS = 'discounts/SELECT_DISCOUNTS';
const REMOVE_DISCOUNT = 'discounts/REMOVE_DISCOUNT';

export const selectDiscounts = createAction(SELECT_DISCOUNTS)<Discount[]>();
export const removeDiscount = createAction(REMOVE_DISCOUNT)<string>();

const actions = { selectDiscounts, removeDiscount };
type DiscountsAction = ActionType<typeof actions>;

// reducer
const discounts = createReducer<DiscountsState, DiscountsAction>(initialState, {
  [SELECT_DISCOUNTS]: (state, action) => action.payload,
  [REMOVE_DISCOUNT]: (state, { payload: id }) => state.filter((item) => item.id !== id),
});

export default discounts;
