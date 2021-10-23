import { createAction, ActionType, createReducer } from 'typesafe-actions';

// state
export type ModalsState = {
  menu: boolean;
  discount: boolean;
};

const initialState: ModalsState = {
  menu: false,
  discount: false,
};

// actions
const TOGGLE_MENU_MODAL = 'modals/TOGGLE_MENU';
const TOGGLE_DISCOUNT_MODAL = 'modals/TOGGLE_DISCOUNT_MODAL';

export const toggleMenuModal = createAction(TOGGLE_MENU_MODAL)();
export const toggleDiscountModal = createAction(TOGGLE_DISCOUNT_MODAL)();

const actions = {
  toggleMenuModal,
  toggleDiscountModal,
};
type ModalsAction = ActionType<typeof actions>;

// reducer
const modals = createReducer<ModalsState, ModalsAction>(initialState, {
  [TOGGLE_MENU_MODAL]: (state) => ({ ...state, menu: !state.menu }),
  [TOGGLE_DISCOUNT_MODAL]: (state) => ({ ...state, discount: !state.discount }),
});

export default modals;
