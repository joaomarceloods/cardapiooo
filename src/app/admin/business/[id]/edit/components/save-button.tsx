import { ReactEventHandler } from 'react'
import { denormalizeState } from '../provider/normalizr'
import { useReducerState } from '../provider/provider'

const SaveButton = () => {
  const state = useReducerState()

  const onClickSave: ReactEventHandler<HTMLButtonElement> = async () => {
    const business = denormalizeState(state)
    business.menus = business.menus.map((m: any) => m.id)

    const res = await fetch('/api/business', {
      method: 'POST',
      body: JSON.stringify(business),
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
