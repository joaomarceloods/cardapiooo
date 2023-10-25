import { Reducer } from './types'

const changeBusiness = (
  state: Reducer.State,
  action: Reducer.Action.ChangeBusiness
): Reducer.State => {
  const business = state.entities.businesses[state.result]

  return {
    ...state,
    entities: {
      ...state.entities,
      businesses: {
        [business.id]: {
          ...business,
          [action.payload.property]: action.payload.value,
        },
      },
    },
  }
}

const moveMenu = (
  state: Reducer.State,
  action: Reducer.Action.MoveMenu
): Reducer.State => {
  const { id, sourceIndex, destinationIndex } = action.payload
  const business = state.entities.businesses[state.result]
  const sortedMenuIds = Array.from(business.sortedMenuIds)
  sortedMenuIds.splice(sourceIndex, 1)
  sortedMenuIds.splice(destinationIndex, 0, id)

  return {
    ...state,
    entities: {
      ...state.entities,
      businesses: {
        ...state.entities.businesses,
        [business.id]: {
          ...business,
          sortedMenuIds,
        },
      },
    },
  }
}

export const reducer = (
  state: Reducer.State,
  action: Reducer.Action
): Reducer.State => {
  switch (action.type) {
    case Reducer.ActionType.ChangeBusiness:
      return changeBusiness(state, action)
    case Reducer.ActionType.MoveMenu:
      return moveMenu(state, action)
    default:
      throw new Error(`Unhandled action type: ${JSON.stringify(action)}`)
  }
}

export default reducer
