import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react'
import initialData from './initial-data'

export interface BaseState {
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

const BoardContext = createContext<BaseState | null>(null)

const BoardDispatchContext = createContext<Dispatch<BaseAction> | null>(null)

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
  const [state, dispatch] = useReducer(boardReducer, initialData as never)

  return (
    <BoardContext.Provider value={state}>
      <BoardDispatchContext.Provider value={dispatch}>
        {children}
      </BoardDispatchContext.Provider>
    </BoardContext.Provider>
  )
}

export enum BoardActionType {
  ChangeSection = 'change-section',
  ChangeItem = 'change-item',
  AddSection = 'add-section',
  AddItem = 'add-item',
}

interface ChangeSectionAction {
  type: BoardActionType.ChangeSection
  payload: {
    id: string
    property: string
    value: string
  }
}

interface ChangeItemAction {
  type: BoardActionType.ChangeItem
  payload: {
    id: string
    property: string
    value: string
  }
}

interface AddSectionAction {
  type: BoardActionType.AddSection
  payload: {
    afterSectionId?: string
  }
}

interface AddItemAction {
  type: BoardActionType.AddItem
  payload: {
    sectionId: string
  }
}

export type BaseAction =
  | ChangeSectionAction
  | ChangeItemAction
  | AddSectionAction
  | AddItemAction

const boardReducer = (state: BaseState, action: BaseAction) => {
  switch (action.type) {
    case BoardActionType.ChangeSection:
      return changeSectionReducer(state, action)
    case BoardActionType.ChangeItem:
      return changeItemReducer(state, action)
    case BoardActionType.AddSection:
      return addSectionReducer(state, action)
    case BoardActionType.AddItem:
      return addItemReducer(state, action)
    default:
      break
  }
  return state
}

const changeSectionReducer = (state: BaseState, action: ChangeSectionAction) => {
  const section = state.sections[action.payload.id]

  return {
    ...state,
    sections: {
      ...state.sections,
      [section.id]: {
        ...section,
        [action.payload.property]: action.payload.value,
      },
    },
  }
}

const changeItemReducer = (state: BaseState, action: ChangeItemAction) => {
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
}

const addSectionReducer = (state: BaseState, action: AddSectionAction) => {
  const sortedSectionIds = Array.from(state.sortedSectionIds)
  const newSectionId = `section-${crypto.randomUUID()}`
  const { afterSectionId } = action.payload

  if (afterSectionId) {
    const newSectionIndex = sortedSectionIds.indexOf(afterSectionId) + 1
    sortedSectionIds.splice(newSectionIndex, 0, newSectionId)
  } else {
    sortedSectionIds.unshift(newSectionId)
  }

  return {
    ...state,
    sortedSectionIds,
    sections: {
      ...state.sections,
      [newSectionId]: {
        id: newSectionId,
        title: '',
        sortedItemIds: [],
      },
    },
  }
}

const addItemReducer = (state: BaseState, action: AddItemAction) => {
  const section = state.sections[action.payload.sectionId]
  const sortedItemIds = Array.from(section.sortedItemIds)
  const newItemId = `item-${crypto.randomUUID()}`
  sortedItemIds.push(newItemId)

  return {
    ...state,
    sections: {
      ...state.sections,
      [section.id]: {
        ...section,
        sortedItemIds,
      },
    },
    items: {
      ...state.items,
      [newItemId]: {
        id: newItemId,
        type: 'product',
        data: {
          name: '',
        },
      },
    },
  }
}
