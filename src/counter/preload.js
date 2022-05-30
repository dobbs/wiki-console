const {contextBridge} = require('electron')
const {configureStore, createSlice} = require('@reduxjs/toolkit')

const counter = createSlice({
  name: 'counter',
  initialState: {count: +window.localStorage.getItem('counter.count')},
  reducers: {
    increment(state) {state.count += 1},
    decrement(state) {state.count -= 1}
  }
})
const {increment, decrement} = counter.actions
const store = configureStore({
  reducer: {counter: counter.reducer}
})
store.subscribe(() => {
  window.localStorage.setItem('counter.count', store.getState().counter.count)
})

contextBridge.exposeInMainWorld(
  'state',
  {
    value() {return +store.getState().counter.count},
    increment() {store.dispatch(increment())},
    decrement() {store.dispatch(decrement())},
  }
)
