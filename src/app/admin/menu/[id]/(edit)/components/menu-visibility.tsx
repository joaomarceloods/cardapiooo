import { Alert, Button, Flex, Spin } from 'antd'
import Link from 'next/link'
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
        description="Your customers can view this menu."
        type="info"
        action={
          <Flex vertical gap={8}>
            <Button
              ghost
              size="small"
              type="primary"
              danger
              onClick={onClickPublish}
            >
              Unpublish
            </Button>
            <Button type="primary" ghost size="small">
              <Link href={`/${menuId}`} target="_blank">
                View
              </Link>
            </Button>
          </Flex>
        }
      />
    )
  }

  return (
    <>
      <Alert
        message="Not published"
        description="When the menu is ready, click on Publish to make it accessible to your customers."
        type="warning"
        action={
          <Flex vertical>
            <Button ghost size="small" type="primary" onClick={onClickPublish}>
              Publish
            </Button>
          </Flex>
        }
      />
      <Spin spinning={saving} fullscreen />
    </>
  )
}

export default MenuVisibility
