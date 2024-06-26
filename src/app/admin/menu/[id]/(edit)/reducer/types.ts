import { NormalizedSchema } from 'normalizr'

export namespace Entity {
  export interface Menu {
    id: string
    title: string
    visible: boolean
    sections: string[]
  }

  export interface Section {
    id: string
    title: string
    items: string[]
  }

  export interface Item {
    id: string
    type: 'product' | 'remark'
    data: ProductData | RemarkData
  }

  export interface ProductData {
    title?: string
    description?: string
    price?: string
    photo?: string
  }

  export interface RemarkData {
    content?: string
  }
}

export namespace Normalization {
  export interface EntityMap {
    menus: {
      [key: string]: Entity.Menu
    }
    sections: {
      [key: string]: Entity.Section
    }
    items: {
      [key: string]: Entity.Item
    }
  }

  // Result is just the menu id
  export type Result = string

  export type Schema = NormalizedSchema<EntityMap, Result>
}

type TouchTracking<T> = T & { touched: boolean }

export namespace Reducer {
  // State has two top-level keys:
  // - result: main entity id,
  // - entities: same shape as Normalization.EntityMap
  export type State = TouchTracking<Normalization.Schema>

  export enum ActionType {
    Pristine = 'pristine',
    ChangeMenu = 'change-menu',
    ChangeSection = 'change-section',
    ChangeItem = 'change-item',
    AddSection = 'add-section',
    AddItem = 'add-item',
    MoveSection = 'move-section',
    MoveItem = 'move-item',
    DeleteSection = 'delete-section',
    DeleteItem = 'delete-item',
  }

  export type Action =
    | Action.Pristine
    | Action.ChangeMenu
    | Action.ChangeSection
    | Action.ChangeItem
    | Action.AddSection
    | Action.AddItem
    | Action.MoveSection
    | Action.MoveItem
    | Action.DeleteSection
    | Action.DeleteItem

  export namespace Action {
    export interface Pristine {
      type: ActionType.Pristine
    }

    export interface ChangeMenu {
      type: ActionType.ChangeMenu
      payload: {
        property: string
        value: any
      }
    }

    export interface ChangeSection {
      type: ActionType.ChangeSection
      payload: {
        id: string
        property: string
        value: any
      }
    }

    export interface ChangeItem {
      type: ActionType.ChangeItem
      payload: {
        id: string
        property: string
        value: any
      }
    }

    export interface AddSection {
      type: ActionType.AddSection
      payload: {
        afterSectionId?: string
      }
    }

    export interface AddItem {
      type: ActionType.AddItem
      payload: {
        sectionId: string
      }
    }

    export interface MoveSection {
      type: ActionType.MoveSection
      payload: {
        id: string
        sourceIndex: number
        destinationIndex: number
      }
    }

    export interface MoveItem {
      type: ActionType.MoveItem
      payload: {
        id: string
        sourceIndex: number
        destinationIndex: number
        sourceSectionId: string
        destinationSectionId: string
      }
    }

    export interface DeleteSection {
      type: ActionType.DeleteSection
      payload: {
        id: string
      }
    }

    export interface DeleteItem {
      type: ActionType.DeleteItem
      payload: {
        id: string
        sectionId: string
      }
    }
  }
}
