import { NormalizedSchema } from 'normalizr'

export namespace Entity {
  export interface Business {
    id: string
    title: string
    sortedMenuIds: string[]
  }
}

export namespace DenormalizedEntity {
  export interface Business extends Entity.Business {}
}

export namespace Normalization {
  export interface EntityMap {
    businesses: {
      [key: string]: Entity.Business
    }
  }

  // Result is just the business id
  export type Result = string

  export type Schema = NormalizedSchema<EntityMap, Result>
}

export namespace Reducer {
  // State has two top-level keys:
  // - result: main entity id,
  // - entities: same shape as Normalization.EntityMap
  export type State = Normalization.Schema

  export enum ActionType {
    ChangeBusiness = 'change-menu',
    MoveMenu = 'move-menu'
  }

  export type Action =
    | Action.ChangeBusiness
    | Action.MoveMenu

  export namespace Action {
    export interface ChangeBusiness {
      type: ActionType.ChangeBusiness
      payload: {
        property: string
        value: string
      }
    }

    export interface MoveMenu {
      type: ActionType.MoveMenu
      payload: {
        id: string
        sourceIndex: number
        destinationIndex: number
      }
    }
  }
}
