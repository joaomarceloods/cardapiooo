import { DeleteOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps, Space, Spin, message } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { denormalizeState } from '../reducer/normalizr'
import { useReducerState } from '../reducer/provider'

const Save = () => {
  const state = useReducerState()
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const menuId = state.result

  const onClickSave = async () => {
    setSaving(true)
    const denormalizedState = denormalizeState(state)

    const res = await fetch('/api/menu', {
      method: 'PUT',
      body: JSON.stringify(denormalizedState),
    })

    if (!res.ok) window.alert('Error saving. Try again later.')
    setSaving(false)
    router.refresh()
  }

  const onClickDelete = async () => {
    const confirmed = window.confirm('Delete this menu? This is irreversible.')
    if (!confirmed) return

    setSaving(true)

    const res = await fetch('/api/menu', {
      method: 'DELETE',
      body: JSON.stringify({ id: menuId }),
    })

    if (!res.ok) {
      window.alert('Error deleting. Try again later,')
      setSaving(false)
      return
    }

    router.refresh()
    router.replace(`/admin`)
    message.info('Menu deleted')
  }

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: 'Delete',
      danger: true,
      icon: <DeleteOutlined />,
      onClick: onClickDelete,
    },
  ]

  return (
    <Space>
      <Dropdown.Button
        type="primary"
        onClick={onClickSave}
        menu={{ items: menuItems }}
      >
        Save
      </Dropdown.Button>
      <Spin fullscreen spinning={saving} delay={1000} />
    </Space>
  )
}

export default Save
