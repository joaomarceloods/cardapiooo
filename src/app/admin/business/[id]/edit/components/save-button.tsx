import { ReactEventHandler } from 'react'
import { denormalizeState } from '../provider/normalizr'
import { useReducerState } from '../provider/provider'

const SaveButton = () => {
  const state = useReducerState()

  const onClickSave: ReactEventHandler<HTMLButtonElement> = async () => {
    const { _id, title, sortedMenuIds } = denormalizeState(state)
    const document = { _id, title, sortedMenuIds }

    await fetch('/api/business', {
      method: 'POST',
      body: JSON.stringify(document),
    })
  }

  return (
    <button type="submit" onClick={onClickSave}>
      Save
    </button>
  )
}

export default SaveButton
