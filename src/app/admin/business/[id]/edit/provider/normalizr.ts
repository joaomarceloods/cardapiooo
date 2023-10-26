import { NormalizedSchema, denormalize, normalize, schema } from 'normalizr'
import { DenormalizedEntity, Entity, Normalization, Reducer } from './types'

const businessSchema = new schema.Entity<Entity.Business>('businesses')

export const normalizeState = (
  denormalizedState: DenormalizedEntity.Business
): NormalizedSchema<Normalization.EntityMap, string> => {
  return normalize<
    typeof denormalizedState,
    Normalization.EntityMap,
    Normalization.Result
  >(denormalizedState, businessSchema)
}

export const denormalizeState = (
  normalizedState: Reducer.State
): DenormalizedEntity.Business => {
  return denormalize(
    normalizedState.result,
    businessSchema,
    normalizedState.entities
  )
}
