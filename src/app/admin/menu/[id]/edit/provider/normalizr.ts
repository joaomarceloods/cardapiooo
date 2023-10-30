import { denormalize, normalize, schema } from 'normalizr'
import { Entity, Normalization, Reducer } from './types'

const itemSchema = new schema.Entity<Entity.Item>('items')

const sectionSchema = new schema.Entity<Entity.Section>('sections', {
  items: [itemSchema],
})

const menuSchema = new schema.Entity<Entity.Menu>(
  'menus',
  { sections: [sectionSchema] },
  { idAttribute: '_id' }
)

export const normalizeState = (data: any) => {
  return normalize<typeof data, Normalization.EntityMap, Normalization.Result>(
    data,
    menuSchema
  )
}

// TODO return type
export const denormalizeState = (data: Reducer.State) => {
  return denormalize(data.result, menuSchema, data.entities)
}
