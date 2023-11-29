import { Schema } from 'mongoose'

// Don't export. Subdocument of Section.
const ItemSchema = new Schema(
  {
    type: {
      require: true,
      type: String,
      enum: ['product', 'remark'],
    },
    data: {
      require: true,
      type: Schema.Types.Mixed,
      /**
      TODO: enum?
      `data` can be any of these types:

      - Remark: { content: String }
      - Product: { title: String, price: String }
    */
    },
  },
  {
    toJSON: {
      versionKey: false,
      flattenObjectIds: true,
      transform: (doc, ret, options) => {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

// Don't export. Subdocument of Menu.
const SectionSchema = new Schema(
  {
    title: {
      require: true,
      type: String,
    },
    items: {
      require: true,
      type: [ItemSchema],
    },
  },
  {
    toJSON: {
      versionKey: false,
      flattenObjectIds: true,
      transform: (doc, ret, options) => {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

export const MenuSchema = new Schema(
  {
    title: {
      require: true,
      type: String,
    },
    visible: {
      require: true,
      type: Boolean,
      default: false,
    },
    sections: {
      require: true,
      type: [SectionSchema],
    },
  },
  {
    toJSON: {
      versionKey: false,
      flattenObjectIds: true,
      transform: (doc, ret, options) => {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

export const BusinessSchema = new Schema(
  {
    title: {
      require: true,
      type: String,
    },
    menus: {
      require: true,
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Menu',
        },
      ],
    },
  },
  {
    toJSON: {
      versionKey: false,
      flattenObjectIds: true,
      transform: (doc, ret, options) => {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

export const BusinessUserSchema = new Schema(
  {
    user: {
      require: true,
      type: String,
    },
    business: {
      require: true,
      type: Schema.Types.ObjectId,
      ref: 'Business',
    },
  },
  {
    collection: 'businessUsers',
  }
)
