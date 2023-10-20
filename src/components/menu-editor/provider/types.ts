export namespace MenuEditorState {
  export type Base = Menu

  export interface Menu {
    title: string
    items: { [key: string]: Item }
    sections: { [key: string]: Section }
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
    title?: string
    description?: string
    price?: number
  }

  export interface RemarkData {
    content?: string
  }

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
