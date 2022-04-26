const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

// Action
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOKED = "CAKE_RESTOKED";
const ICECFREAM_ORDERED = "ICECREAM_ORDERED";
const ICECFREAM_RESTOCKED = "ICECFREAM_RESTOCKED";

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

function orderIceCream(qty = 1) {
  return {
    type: ICECFREAM_ORDERED,
    payload: qty,
  };
}
function restockIceCream(qty = 1) {
  return {
    type: ICECFREAM_RESTOCKED,
    payload: qty,
  };
}

// const initialState = {
//   numOfCakes: 10,
//   numOfIceCream: 20,
// };

const initialStateCakes = {
  numOfCakes: 10,
};

const initialStateIceCream = {
  numOfIceCream: 20,
};

// Reducer
// (previousState, action) = newState

const cakeReducer = (state = initialStateCakes, action) => {
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

const iceCreamReducer = (state = initialStateIceCream, action) => {
  switch (action.type) {
    case ICECFREAM_ORDERED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream - 1,
      };
    case ICECFREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCream: state.numOfIceCream + action.payload,
      };
    default:
      return state;
  }
};

// Store
// Combine multiple reducer
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer);
console.log("initial state", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("update state", store.getState())
);
const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(4);
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(2);



unsubscribe()