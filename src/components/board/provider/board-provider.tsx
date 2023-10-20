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
  MoveSection = 'move-section',
  MoveItem = 'move-item',
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

interface MoveSectionAction {
  type: BoardActionType.MoveSection
  payload: {
    id: string
    sourceIndex: number
    destinationIndex: number
  }
}

interface MoveItemAction {
  type: BoardActionType.MoveItem
  payload: {
    id: string
    sourceIndex: number
    destinationIndex: number
    sourceSectionId: string
    destinationSectionId: string
  }
}

export type BaseAction =
  | ChangeSectionAction
  | ChangeItemAction
  | AddSectionAction
  | AddItemAction
  | MoveSectionAction
  | MoveItemAction

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
    case BoardActionType.MoveSection:
      return moveSectionReducer(state, action)
    case BoardActionType.MoveItem:
      return moveItemReducer(state, action)
    default:
      break
  }
  return state
}

const changeSectionReducer = (
  state: BaseState,
  action: ChangeSectionAction
) => {
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

const moveSectionReducer = (state: BaseState, action: MoveSectionAction) => {
  const { id, sourceIndex, destinationIndex } = action.payload
  const sortedSectionIds = Array.from(state.sortedSectionIds)
  sortedSectionIds.splice(sourceIndex, 1)
  sortedSectionIds.splice(destinationIndex, 0, id)

  return {
    ...state,
    sortedSectionIds,
  }
}

const moveItemReducer = (state: BaseState, action: MoveItemAction) => {
  const {
    id,
    sourceIndex,
    destinationIndex,
    sourceSectionId,
    destinationSectionId,
  } = action.payload

  // Remove item from source
  const sourceSection = state.sections[sourceSectionId]
  const sourceSortedItemIds = Array.from(sourceSection.sortedItemIds)
  sourceSortedItemIds.splice(sourceIndex, 1)

  const newState = {
    ...state,
    sections: {
      ...state.sections,
      [sourceSection.id]: {
        ...sourceSection,
        sortedItemIds: sourceSortedItemIds,
      },
    },
  }

  // Add item to destination
  const destinationSection = newState.sections[destinationSectionId]
  const destinationSortedItemIds = Array.from(destinationSection.sortedItemIds)
  destinationSortedItemIds.splice(destinationIndex, 0, id)

  return {
    ...newState,
    sections: {
      ...newState.sections,
      [destinationSection.id]: {
        ...destinationSection,
        sortedItemIds: destinationSortedItemIds,
      },
    },
  }
}
