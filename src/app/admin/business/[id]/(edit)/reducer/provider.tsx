'use client'

import {
  Dispatch,
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react'
import reducer from './reducer'
import { Reducer } from './types'

const StateContext = createContext<Reducer.State | null>(null)

const DispatchContext = createContext<Dispatch<Reducer.Action> | null>(null)

export const useReducerState = () => {
  const state = useContext(StateContext)
  if (!state) throw new Error('Cannot find StateContext')
  return state
}

export const useReducerDispatch = () => {
  const dispatch = useContext(DispatchContext)
  if (!dispatch) throw new Error('Cannot find DispatchContext')
  return dispatch
}

export const ReducerProvider: FC<
  PropsWithChildren<{ initialState: Reducer.State }>
> = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
