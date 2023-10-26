import { ReactEventHandler } from 'react'
import { denormalizeState } from '../provider/normalizr'
import { useReducerState } from '../provider/provider'

const SaveButton = () => {
  const state = useReducerState()

  const onClickSave: ReactEventHandler<HTMLButtonElement> = async () => {
    const denormalizedState = denormalizeState(state)

    await fetch('/api/menu', {
      method: 'POST',
      body: JSON.stringify(denormalizedState),
    })
  }

  return (
    <button type="submit" onClick={onClickSave}>
      Save
    </button>
  )
}

export default SaveButton
