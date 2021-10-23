import { createAction, ActionType, createReducer } from 'typesafe-actions';

// action
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_BY = 'counter/INCREASE_BY';

// 액션 생성 함수
export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();
// payload 타입은 제네릭으로 설정
export const increaseBy = createAction(INCREASE_BY)<number>();

// 액션 객체들에 대한 타입
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론해줍니다
// type CounterAction =
//   | ReturnType<typeof increase>
//   | ReturnType<typeof decrease>
//   | ReturnType<typeof increaseBy>;

const actions = { increase, decrease, increaseBy };
type CounterAction = ActionType<typeof actions>;

// state type
type CounterState = {
  count: number;
};

// initial state
const initialState: CounterState = {
  count: 0,
};

// reducer
// function counter(
//   state: CounterState = initialState,
//   action: CounterAction
// ): CounterState {
//   switch (action.type) {
//     case INCREASE:
//       return { count: state.count + 1 };
//     case DECREASE:
//       return { count: state.count - 1 };
//     case INCREASE_BY:
//       return { count: state.count + action.payload };
//     default:
//       return state;
//   }
// }

const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: (state) => ({ count: state.count + 1 }),
  [DECREASE]: (state) => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }),
});

export default counter;
