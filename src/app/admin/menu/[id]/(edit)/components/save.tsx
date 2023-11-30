import { LoadingOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { MouseEventHandler, useState } from 'react'
import { denormalizeState } from '../reducer/normalizr'
import { useReducerState } from '../reducer/provider'

const Save = () => {
  const state = useReducerState()
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const onClickSave: MouseEventHandler<HTMLButtonElement> = async () => {
    setSaving(true)
    const denormalizedState = denormalizeState(state)

    const res = await fetch('/api/menu', {
      method: 'PUT',
      body: JSON.stringify(denormalizedState),
    })

    if (!res.ok) window.alert('Error')

    setSaving(false)
    router.refresh()
  }

  return (
    <Button type="primary" onClick={onClickSave} disabled={saving}>
      {saving ? <LoadingOutlined /> : 'Save'}
    </Button>
  )
}

export default Save
