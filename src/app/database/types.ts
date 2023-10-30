import { Document, ObjectId } from 'mongodb'

export namespace AppDocument {
  export interface Business extends Document {
    _id: ObjectId
    title: string
  }

  export interface BusinessWithMenus extends Document {
    _id: ObjectId
    title: string
    sortedMenuIds: Array<ObjectId>
    menus: Array<{
      _id: ObjectId
      title: string
    }>
  }

  export interface Menu extends Document {
    _id: ObjectId
    title: string
    sortedSectionIds: string[]
    sections: Array<{
      id: string
      title: string
      sortedItemIds: string[]
      items: Array<Item.Product | Item.Remark>
    }>
  }

  namespace Item {
    interface BaseItem<Type, Data> {
      id: string
      type: Type
      data: Data
    }

    export type Product = BaseItem<
      'product',
      {
        title: string
        description: string
        price: number
      }
    >

    export type Remark = BaseItem<
      'remark',
      {
        content: string
      }
    >
  }
}
