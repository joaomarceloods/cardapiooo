import { ReactEventHandler } from 'react'
import { denormalizeState } from '../provider/normalizr'
import { useReducerState } from '../provider/provider'

const SaveButton = () => {
  const state = useReducerState()

  const onClickSave: ReactEventHandler<HTMLButtonElement> = async () => {
    const { id, title, sortedMenuIds } = denormalizeState(state)
    const document = { id, title, sortedMenuIds }

    const res = await fetch('/api/business', {
      method: 'POST',
      body: JSON.stringify(document),
    })

    if (!res.ok) window.alert('Error saving')
  }

  return (
    <button type="submit" onClick={onClickSave}>
      Save
    </button>
  )
}

export default SaveButton
