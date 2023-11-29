import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { MouseEventHandler } from 'react'
import { denormalizeState } from '../provider/normalizr'
import { useReducerState } from '../provider/provider'

const Save = () => {
  const state = useReducerState()
  const router = useRouter()

  const onClickSave: MouseEventHandler<HTMLButtonElement> = async () => {
    const denormalizedState = denormalizeState(state)

    const res = await fetch('/api/menu', {
      method: 'POST',
      body: JSON.stringify(denormalizedState),
    })

    if (!res.ok) window.alert('Error saving')

    router.push('/admin')
  }

  return (
    <Button type="primary" onClick={onClickSave}>
      Save
    </Button>
  )
}

export default Save
