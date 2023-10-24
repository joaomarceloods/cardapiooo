import {
  Dispatch,
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react'
import reducer from './reducer'
import { MenuEditorAction, Reducer } from './types'

const MenuContext = createContext<Reducer.State | null>(null)

const MenuDispatchContext = createContext<Dispatch<MenuEditorAction> | null>(
  null
)

export const useMenuEditor = () => {
  const state = useContext(MenuContext)
  if (!state) throw new Error('Cannot find MenuEditorProvider')
  return state
}

export const useMenuEditorDispatch = () => {
  const dispatch = useContext(MenuDispatchContext)
  if (!dispatch) throw new Error('Cannot find MenuEditorProvider')
  return dispatch
}

export const MenuEditorProvider: FC<
  PropsWithChildren<{ initialState: Reducer.State }>
> = ({ initialState, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState as never)

  return (
    <MenuContext.Provider value={state}>
      <MenuDispatchContext.Provider value={dispatch}>
        {children}
      </MenuDispatchContext.Provider>
    </MenuContext.Provider>
  )
}
