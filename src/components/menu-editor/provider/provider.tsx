import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react'
import initialData from './initial-data'
import reducer from './reducer'
import { MenuEditorAction, MenuEditorState } from './types'

const MenuContext = createContext<MenuEditorState.Base | null>(null)

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

export const BoardProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialData as never)

  return (
    <MenuContext.Provider value={state}>
      <MenuDispatchContext.Provider value={dispatch}>
        {children}
      </MenuDispatchContext.Provider>
    </MenuContext.Provider>
  )
}
