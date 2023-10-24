import { MenuEditorAction, MenuEditorActionType, Reducer } from './types'

const changeMenu = (
  state: Reducer.State,
  action: MenuEditorAction.ChangeMenu
): Reducer.State => {
  const menu = state.entities.menus[state.result]

  return {
    ...state,
    entities: {
      ...state.entities,
      menus: {
        [menu.id]: {
          ...menu,
          [action.payload.property]: action.payload.value,
        },
      },
    },
  }
}

const changeSection = (
  state: Reducer.State,
  action: MenuEditorAction.ChangeSection
): Reducer.State => {
  const section = state.entities.sections[action.payload.id]

  return {
    ...state,
    entities: {
      ...state.entities,
      sections: {
        ...state.entities.sections,
        [section.id]: {
          ...section,
          [action.payload.property]: action.payload.value,
        },
      },
    },
  }
}

const changeItem = (
  state: Reducer.State,
  action: MenuEditorAction.ChangeItem
): Reducer.State => {
  const item = state.entities.items[action.payload.id]

  return {
    ...state,
    entities: {
      ...state.entities,
      items: {
        ...state.entities.items,
        [item.id]: {
          ...item,
          data: {
            ...item.data,
            [action.payload.property]: action.payload.value,
          },
        },
      },
    },
  }
}

const addSection = (
  state: Reducer.State,
  action: MenuEditorAction.AddSection
): Reducer.State => {
  const menu = state.entities.menus[state.result]
  const sortedSectionIds = Array.from(menu.sortedSectionIds)
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
    entities: {
      ...state.entities,
      sections: {
        ...state.entities.sections,
        [newSectionId]: {
          id: newSectionId,
          title: '',
          sortedItemIds: [],
        },
      },
    },
  }
}

const addItem = (
  state: Reducer.State,
  action: MenuEditorAction.AddItem
): Reducer.State => {
  const section = state.entities.sections[action.payload.sectionId]
  const sortedItemIds = Array.from(section.sortedItemIds)
  const newItemId = `item-${crypto.randomUUID()}`
  sortedItemIds.push(newItemId)

  return {
    ...state,
    entities: {
      ...state.entities,
      sections: {
        ...state.entities.sections,
        [section.id]: {
          ...section,
          sortedItemIds,
        },
      },
      items: {
        ...state.entities.items,
        [newItemId]: {
          id: newItemId,
          type: 'product',
          data: {
            title: '',
          },
        },
      },
    },
  }
}

const moveSection = (
  state: Reducer.State,
  action: MenuEditorAction.MoveSection
): Reducer.State => {
  const { id, sourceIndex, destinationIndex } = action.payload
  const menu = state.entities.menus[state.result]
  const sortedSectionIds = Array.from(menu.sortedSectionIds)
  sortedSectionIds.splice(sourceIndex, 1)
  sortedSectionIds.splice(destinationIndex, 0, id)

  return {
    ...state,
    entities: {
      ...state.entities,
      menus: {
        ...state.entities.menus,
        [menu.id]: {
          ...menu,
          sortedSectionIds,
        },
      },
    },
  }
}

const moveItem = (
  state: Reducer.State,
  action: MenuEditorAction.MoveItem
): Reducer.State => {
  const {
    id,
    sourceIndex,
    destinationIndex,
    sourceSectionId,
    destinationSectionId,
  } = action.payload

  // Remove item from source
  const sourceSection = state.entities.sections[sourceSectionId]
  const sourceSortedItemIds = Array.from(sourceSection.sortedItemIds)
  sourceSortedItemIds.splice(sourceIndex, 1)

  const newState = {
    ...state,
    entities: {
      ...state.entities,
      sections: {
        ...state.entities.sections,
        [sourceSection.id]: {
          ...sourceSection,
          sortedItemIds: sourceSortedItemIds,
        },
      },
    },
  }

  // Add item to destination
  const destinationSection = newState.entities.sections[destinationSectionId]
  const destinationSortedItemIds = Array.from(destinationSection.sortedItemIds)
  destinationSortedItemIds.splice(destinationIndex, 0, id)

  return {
    ...newState,
    entities: {
      ...newState.entities,
      sections: {
        ...newState.entities.sections,
        [destinationSection.id]: {
          ...destinationSection,
          sortedItemIds: destinationSortedItemIds,
        },
      },
    },
  }
}

export const reducer = (
  state: Reducer.State,
  action: MenuEditorAction
): Reducer.State => {
  switch (action.type) {
    case MenuEditorActionType.ChangeMenu:
      return changeMenu(state, action)
    case MenuEditorActionType.ChangeSection:
      return changeSection(state, action)
    case MenuEditorActionType.ChangeItem:
      return changeItem(state, action)
    case MenuEditorActionType.AddSection:
      return addSection(state, action)
    case MenuEditorActionType.AddItem:
      return addItem(state, action)
    case MenuEditorActionType.MoveSection:
      return moveSection(state, action)
    case MenuEditorActionType.MoveItem:
      return moveItem(state, action)
    default:
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`)
  }
}

export default reducer
