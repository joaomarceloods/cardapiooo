import { QrcodeOutlined } from '@ant-design/icons'
import { Alert, Button, Space, Spin } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useReducerDispatch, useReducerState } from '../reducer/provider'
import { Reducer } from '../reducer/types'

const MenuVisibility = () => {
  const dispatch = useReducerDispatch()
  const state = useReducerState()
  const menuId = state.result
  const { visible } = state.entities.menus[menuId]
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const onClickPublish = async () => {
    const newVisible = !visible
    setSaving(true)

    const res = await fetch('/api/menu', {
      method: 'PUT',
      body: JSON.stringify({ id: menuId, visible: newVisible }),
    })

    if (!res.ok) window.alert('Error saving. Try again later.')
    setSaving(false)
    router.refresh()

    dispatch({
      type: Reducer.ActionType.ChangeMenu,
      payload: { property: 'visible', value: newVisible },
    })
  }

  if (visible) {
    return (
      <Alert
        message="Published"
        type="info"
        action={
          <Space>
            <Button
              ghost
              size="small"
              type="link"
              danger
              onClick={onClickPublish}
            >
              Unpublish
            </Button>
          </Space>
        }
      />
    )
  }

  return (
    <>
      <Alert
        message="Currently inaccessible to customers"
        type="error"
        action={
          <Space>
            <Button size="small" type="link" onClick={onClickPublish}>
              Publish
            </Button>
          </Space>
        }
      />
      <Spin spinning={saving} fullscreen />
    </>
  )
}

export default MenuVisibility
