const redux = require('redux')
const createStore = redux.createStore

const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOKED = "CAKE_RESTOKED";

// Action creators
function orderCake() {
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOKED,
    payload: qty,
  };
}

const initialState = {
  numOfCakes: 10,
};

// Reducer
// (previousState, action) = newState

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

// Store
const store = createStore(reducer)
console.log("initial state", store.getState())

const unsubscribe = store.subscribe(() => console.log("update state", store.getState()))

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(restockCake(3));

unsubscribe()