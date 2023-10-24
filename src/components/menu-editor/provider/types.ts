import { NormalizedSchema } from 'normalizr'

export namespace Entity {
  export interface Menu {
    id: string
    title: string
    sortedSectionIds: string[]
  }

  export interface Section {
    id: string
    title: string
    sortedItemIds: string[]
  }

  export interface Item {
    id: string
    type: 'product' | 'remark'
    data: ProductData | RemarkData
  }

  export interface ProductData {
    title?: string
    description?: string
    price?: number
  }

  export interface RemarkData {
    content?: string
  }
}

export namespace DenormalizedEntity {
  export interface Menu extends Entity.Menu {
    sections: Section[]
  }

  export interface Section extends Entity.Section {
    items: Item[]
  }

  export interface Item extends Entity.Item {}
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

export namespace Reducer {
  export type State = Normalization.Schema
}

export namespace MenuEditorAction {
  export interface ChangeMenu {
    type: MenuEditorActionType.ChangeMenu
    payload: {
      property: string
      value: string
    }
  }

  export interface ChangeSection {
    type: MenuEditorActionType.ChangeSection
    payload: {
      id: string
      property: string
      value: string
    }
  }

  export interface ChangeItem {
    type: MenuEditorActionType.ChangeItem
    payload: {
      id: string
      property: string
      value: string
    }
  }

  export interface AddSection {
    type: MenuEditorActionType.AddSection
    payload: {
      afterSectionId?: string
    }
  }

  export interface AddItem {
    type: MenuEditorActionType.AddItem
    payload: {
      sectionId: string
    }
  }

  export interface MoveSection {
    type: MenuEditorActionType.MoveSection
    payload: {
      id: string
      sourceIndex: number
      destinationIndex: number
    }
  }

  export interface MoveItem {
    type: MenuEditorActionType.MoveItem
    payload: {
      id: string
      sourceIndex: number
      destinationIndex: number
      sourceSectionId: string
      destinationSectionId: string
    }
  }
}

export type MenuEditorAction =
  | MenuEditorAction.ChangeMenu
  | MenuEditorAction.ChangeSection
  | MenuEditorAction.ChangeItem
  | MenuEditorAction.AddSection
  | MenuEditorAction.AddItem
  | MenuEditorAction.MoveSection
  | MenuEditorAction.MoveItem

export enum MenuEditorActionType {
  ChangeMenu = 'change-menu',
  ChangeSection = 'change-section',
  ChangeItem = 'change-item',
  AddSection = 'add-section',
  AddItem = 'add-item',
  MoveSection = 'move-section',
  MoveItem = 'move-item',
}
