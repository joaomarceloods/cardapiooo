import { LoadingOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'
import { MouseEventHandler, useState } from 'react'
import { denormalizeState } from '../provider/normalizr'
import { useReducerState } from '../provider/provider'

const Save = () => {
  const state = useReducerState()
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const onClickSave: MouseEventHandler<HTMLButtonElement> = async () => {
    setSaving(true)
    const business = denormalizeState(state)
    business.menus = business.menus.map((m: any) => m.id)

    const res = await fetch('/api/business', {
      method: 'POST',
      body: JSON.stringify(business),
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
