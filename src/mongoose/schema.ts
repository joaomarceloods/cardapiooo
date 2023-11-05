import { Schema } from 'mongoose'

// Don't export. Nested path of Section.
const ItemSchema = {
  id: {
    require: true,
    type: String,
  },
  type: {
    require: true,
    type: String,
    enum: ['product', 'remark'],
  },
  /**
    `data` can be any of these types:

    Remark:
    { content: String }

    Product:
    { title: String, price: String }
   */
  data: {
    require: true,
    type: Schema.Types.Mixed,
    // TODO: enum?
  },
}

// Don't export. Nested path of Menu.
const SectionSchema = {
  id: {
    require: true,
    type: String,
  },
  title: {
    require: true,
    type: String,
  },
  sortedItemIds: {
    require: true,
    type: [String],
  },
  items: {
    require: true,
    type: [ItemSchema],
  },
}

export const MenuSchema = new Schema({
  title: {
    require: true,
    type: String,
  },
  sortedSectionIds: {
    require: true,
    type: [String],
  },
  sections: {
    require: true,
    type: [SectionSchema],
  },
})

export const BusinessSchema = new Schema(
  {
    title: {
      require: true,
      type: String,
    },
    sortedMenuIds: {
      require: true,
      type: [Schema.Types.ObjectId],
    },
  },
  {
    virtuals: {
      menus: {
        options: {
          ref: 'Menu',
          localField: 'sortedMenuIds',
          foreignField: '_id',
        },
      },
    },
  }
)
