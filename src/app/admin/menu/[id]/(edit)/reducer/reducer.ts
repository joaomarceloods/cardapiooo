import { Reducer } from './types'

// Use `require` because `import` throws a runtime error:
// Error: Element type is invalid. Received a promise that resolves to: [object Promise].
// Lazy element type must resolve to a class or function.
const { ObjectId } = require('bson')

const pristine = (state: Reducer.State) => ({ ...state, touched: false })

const changeMenu = (
  state: Reducer.State,
  action: Reducer.Action.ChangeMenu
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
  action: Reducer.Action.ChangeSection
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
  action: Reducer.Action.ChangeItem
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
  action: Reducer.Action.AddSection
): Reducer.State => {
  const menu = state.entities.menus[state.result]
  const sections = Array.from(menu.sections)
  const newSectionId = new ObjectId().toString()
  const { afterSectionId } = action.payload

  if (afterSectionId) {
    const newSectionIndex = sections.indexOf(afterSectionId) + 1
    sections.splice(newSectionIndex, 0, newSectionId)
  } else {
    sections.unshift(newSectionId)
  }

  return {
    ...state,
    entities: {
      ...state.entities,
      menus: {
        ...state.entities.menus,
        [menu.id]: {
          ...menu,
          sections,
        },
      },
      sections: {
        ...state.entities.sections,
        [newSectionId]: {
          id: newSectionId,
          title: '',
          items: [],
        },
      },
    },
  }
}

const addItem = (
  state: Reducer.State,
  action: Reducer.Action.AddItem
): Reducer.State => {
  const section = state.entities.sections[action.payload.sectionId]
  const items = Array.from(section.items)
  const newItemId = new ObjectId().toString()
  items.push(newItemId)

  return {
    ...state,
    entities: {
      ...state.entities,
      sections: {
        ...state.entities.sections,
        [section.id]: {
          ...section,
          items,
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
  action: Reducer.Action.MoveSection
): Reducer.State => {
  const { id, sourceIndex, destinationIndex } = action.payload
  const menu = state.entities.menus[state.result]
  const sections = Array.from(menu.sections)
  sections.splice(sourceIndex, 1)
  sections.splice(destinationIndex, 0, id)

  return {
    ...state,
    entities: {
      ...state.entities,
      menus: {
        ...state.entities.menus,
        [menu.id]: {
          ...menu,
          sections,
        },
      },
    },
  }
}

const moveItem = (
  state: Reducer.State,
  action: Reducer.Action.MoveItem
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
  const sourceItems = Array.from(sourceSection.items)
  sourceItems.splice(sourceIndex, 1)

  const newState = {
    ...state,
    entities: {
      ...state.entities,
      sections: {
        ...state.entities.sections,
        [sourceSection.id]: {
          ...sourceSection,
          items: sourceItems,
        },
      },
    },
  }

  // Add item to destination
  const destinationSection = newState.entities.sections[destinationSectionId]
  const destinationItems = Array.from(destinationSection.items)
  destinationItems.splice(destinationIndex, 0, id)

  return {
    ...newState,
    entities: {
      ...newState.entities,
      sections: {
        ...newState.entities.sections,
        [destinationSection.id]: {
          ...destinationSection,
          items: destinationItems,
        },
      },
    },
  }
}

const deleteSection = (
  state: Reducer.State,
  action: Reducer.Action.DeleteSection
): Reducer.State => {
  const { id } = action.payload
  const section = state.entities.sections[id]
  const items = { ...state.entities.items }

  for (const i of section.items) {
    delete items[i]
  }

  const sections = { ...state.entities.sections }
  delete sections[id]

  const menu = { ...state.entities.menus[state.result] }
  menu.sections = menu.sections.filter((s) => s !== id)

  return {
    ...state,
    entities: {
      ...state.entities,
      items,
      sections,
      menus: {
        ...state.entities.menus,
        [state.result]: menu,
      },
    },
  }
}

const deleteItem = (
  state: Reducer.State,
  action: Reducer.Action.DeleteItem
): Reducer.State => {
  const { id, sectionId } = action.payload

  const items = { ...state.entities.items }
  delete items[id]

  const section = { ...state.entities.sections[sectionId] }
  section.items = section.items.filter((i) => i !== id)

  return {
    ...state,
    entities: {
      ...state.entities,
      items,
      sections: {
        ...state.entities.sections,
        [sectionId]: section,
      },
    },
  }
}

const handleAction = (
  state: Reducer.State,
  action: Reducer.Action
): Reducer.State => {
  switch (action.type) {
    case Reducer.ActionType.Pristine:
      return pristine(state)
    case Reducer.ActionType.ChangeMenu:
      return changeMenu(state, action)
    case Reducer.ActionType.ChangeSection:
      return changeSection(state, action)
    case Reducer.ActionType.ChangeItem:
      return changeItem(state, action)
    case Reducer.ActionType.AddSection:
      return addSection(state, action)
    case Reducer.ActionType.AddItem:
      return addItem(state, action)
    case Reducer.ActionType.MoveSection:
      return moveSection(state, action)
    case Reducer.ActionType.MoveItem:
      return moveItem(state, action)
    case Reducer.ActionType.DeleteSection:
      return deleteSection(state, action)
    case Reducer.ActionType.DeleteItem:
      return deleteItem(state, action)
    default:
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`)
  }
}

const touch = (state: Reducer.State) => ({ ...state, touched: true })

export const reducer = (
  state: Reducer.State,
  action: Reducer.Action
): Reducer.State => {
  return handleAction(touch(state), action)
}

export default reducer
