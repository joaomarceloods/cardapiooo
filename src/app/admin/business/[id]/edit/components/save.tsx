import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { MouseEventHandler } from 'react'
import { denormalizeState } from '../provider/normalizr'
import { useReducerState } from '../provider/provider'

const Save = () => {
  const state = useReducerState()
  const router = useRouter()

  const onClickSave: MouseEventHandler<HTMLButtonElement> = async () => {
    const business = denormalizeState(state)
    business.menus = business.menus.map((m: any) => m.id)

    const res = await fetch('/api/business', {
      method: 'POST',
      body: JSON.stringify(business),
    })

    if (!res.ok) {
      window.alert('Error saving')
    }

    router.refresh()
  }

  return (
    <Button type="primary" onClick={onClickSave}>
      Save
    </Button>
  )
}

export default Save
