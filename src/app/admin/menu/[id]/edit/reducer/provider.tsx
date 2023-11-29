'use client'

import { Dispatch, createContext, useContext, useReducer } from 'react'
import Menu from '../components/menu'
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

export const ReducerProvider = ({ initialState }: { initialState: Reducer.State }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Menu />
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}
