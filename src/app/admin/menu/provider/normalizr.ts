import { denormalize, normalize, schema } from 'normalizr'
import { DenormalizedEntity, Entity, Normalization, Reducer } from './types'

const itemSchema = new schema.Entity<Entity.Item>('items')

const sectionSchema = new schema.Entity<Entity.Section>('sections', {
  items: [itemSchema],
})

const menuSchema = new schema.Entity<Entity.Menu>('menus', {
  sections: [sectionSchema],
})

export const normalizeState = (denormalizedState: DenormalizedEntity.Menu) => {
  return normalize<typeof denormalizedState, Normalization.EntityMap, Normalization.Result>(
    denormalizedState,
    menuSchema
  )
}

export const denormalizeState = (normalizedState: Reducer.State) => {
  return denormalize(normalizedState.result, menuSchema, normalizedState.entities)
}
