import { denormalize, normalize, schema } from 'normalizr'
import { DenormalizedEntity, Entity, Normalization } from './types'

const itemSchema = new schema.Entity<Entity.Item>('items')

const sectionSchema = new schema.Entity<Entity.Section>('sections', {
  items: [itemSchema],
})

// Use `slug` as id because menus intentionally leave out the id field,
// to avoid having to work around MongoDB's ObjectId type.
const menuSchema = new schema.Entity<Entity.Menu>('menus', {
  sections: [sectionSchema],
})

export const normalizeMenu = (data: DenormalizedEntity.Menu) => {
  return normalize<typeof data, Normalization.EntityMap, Normalization.Result>(
    data,
    menuSchema
  )
}

export const denormalizeMenu = (normalizedData: Normalization.Schema) => {
  return denormalize(normalizedData.result, menuSchema, normalizedData.entities)
}
