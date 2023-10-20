import initialData from './initial-data'
import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react'

export interface BoardState {
  name: string
  sections: { [key: string]: Section }
  items: { [key: string]: Item }
  sortedSectionIds: string[]
}

export interface Section {
  id: string
  title: string
  sortedItemIds: string[]
}

export type Item = {
  id: string
  type: 'product' | 'remark'
  data: ProductData | RemarkData
}

export interface ProductData {
  name?: string
  description?: string
  price?: number
}

export interface RemarkData {
  content?: string
}

const BoardContext = createContext<BoardState | null>(null)

const BoardDispatchContext = createContext<Dispatch<BoardAction> | null>(null)

export const useBoard = () => {
  const state = useContext(BoardContext)
  if (!state) throw new Error('Cannot find BoardProvider')
  return state
}

export const useBoardDispatch = () => {
  const dispatch = useContext(BoardDispatchContext)
  if (!dispatch) throw new Error('Cannot find BoardProvider')
  return dispatch
}

export const BoardProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(boardReducer, initialData as BoardState)

  return (
    <BoardContext.Provider value={state}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDispatchContext.Provider>
    </BoardContext.Provider>
  )
}

export enum BoardActionType {
  ChangeItem = 'change-item',
}

export interface BoardAction {
  type: BoardActionType
  payload: any
}

const boardReducer = (state: BoardState, action: BoardAction) => {
  switch (action.type) {
    case BoardActionType.ChangeItem:
      const item = state.items[action.payload.id]

      return {
        ...state,
        items: {
          ...state.items,
          [item.id]: {
            ...item,
            data: {
              ...item.data,
              [action.payload.property]: action.payload.value,
            },
          },
        },
      }

    default:
      break
  }
  return state
}
