import { NormalizedSchema, denormalize, normalize, schema } from 'normalizr'
import { Entity, Normalization, Reducer } from './types'

const menuSchema = new schema.Entity<Entity.Menu>(
  'menus',
  {},
  { idAttribute: '_id' }
)

const businessSchema = new schema.Entity<Entity.Business>(
  'businesses',
  { menus: [menuSchema] },
  { idAttribute: '_id' }
)

export const normalizeState = (
  data: any
): NormalizedSchema<Normalization.Entities, string> => {
  return normalize<typeof data, Normalization.Entities, Normalization.Result>(
    data,
    businessSchema
  )
}

// TODO return type
export const denormalizeState = (data: Reducer.State) => {
  return denormalize(data.result, businessSchema, data.entities)
}
