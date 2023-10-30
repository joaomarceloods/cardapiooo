import { NormalizedSchema } from 'normalizr'

export namespace Entity {
  export interface Business {
    _id: string
    title: string
    sortedMenuIds: string[]
  }

  export interface Menu {
    _id: string
    title: string
  }
}

export namespace Normalization {
  export interface Entities {
    businesses: {
      [key: string]: Entity.Business
    }
    menus: {
      [key: string]: Entity.Menu
    }
  }

  // Result is just the business id
  export type Result = string

  export type Schema = NormalizedSchema<Entities, Result>
}

export namespace Reducer {
  // State has two top-level keys:
  // - result: main entity id,
  // - entities: same shape as Normalization.EntityMap
  export type State = Normalization.Schema

  export enum ActionType {
    ChangeBusiness = 'change-menu',
    MoveMenu = 'move-menu',
  }

  export type Action = Action.ChangeBusiness | Action.MoveMenu

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
