import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import rootReducer, { RootState } from './rootReducer'
import {
  TypedUseSelectorHook,
  useSelector as useReduxSelector
} from 'react-redux'

const store = configureStore({
  reducer: rootReducer
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export type AppDispatch = typeof store.dispatch

// The AppThunk type declares that the "action" that we're using is specifically a thunk function.
// The thunk is customized with some additional type parameters
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export default store
