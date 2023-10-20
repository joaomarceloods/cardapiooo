import { MenuEditorAction, MenuEditorActionType, MenuEditorState } from "./types"

const changeMenu = (state: MenuEditorState.Base, action: MenuEditorAction.ChangeMenu) => {
  return {
    ...state,
    [action.payload.property]: action.payload.value,
  }
}

const changeSection = (state: MenuEditorState.Base, action: MenuEditorAction.ChangeSection) => {
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

const changeItem = (state: MenuEditorState.Base, action: MenuEditorAction.ChangeItem) => {
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

const addSection = (state: MenuEditorState.Base, action: MenuEditorAction.AddSection) => {
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

const addItem = (state: MenuEditorState.Base, action: MenuEditorAction.AddItem) => {
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

const moveSection = (state: MenuEditorState.Base, action: MenuEditorAction.MoveSection) => {
  const { id, sourceIndex, destinationIndex } = action.payload
  const sortedSectionIds = Array.from(state.sortedSectionIds)
  sortedSectionIds.splice(sourceIndex, 1)
  sortedSectionIds.splice(destinationIndex, 0, id)

  return {
    ...state,
    sortedSectionIds,
  }
}

const moveItem = (state: MenuEditorState.Base, action: MenuEditorAction.MoveItem) => {
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

export const reducer = (state: MenuEditorState.Base, action: MenuEditorAction) => {
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
