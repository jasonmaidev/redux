const redux = require('redux')
const reduxLogger = require('redux-logger')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()
const BUY_CAKE = 'BUY_CAKE'
const BUY_CREAM = 'BUY_CREAM'

function buyCake() {
  return {
    type: BUY_CAKE,
    info: 'First redux action'
  }
}

function buyCream() {
  return {
    type: BUY_CREAM,
    info: 'Second redux action'
  }
}

// (prevState, action) => newState

// const initialState = {
//   cakeCount: 10,
//   icecreamCount: 20
// }

const initialCakeState = {
  cakeCount: 10,
}
const initialCreamState = {
  creamCount: 20,
}

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE: return {
      ...state,
      cakeCount: state.cakeCount - 1
    }

    default: return state
  }
}
const creamReducer = (state = initialCreamState, action) => {
  switch (action.type) {
    case BUY_CREAM: return {
      ...state,
      creamCount: state.creamCount - 1
    }

    default: return state
  }
}

const rootReducer = combineReducers({
  cake: cakeReducer,
  cream: creamReducer
})
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Initial state', store.getState())
const unsubscribe = store.subscribe(() => { })

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCream())
store.dispatch(buyCream())
unsubscribe()
