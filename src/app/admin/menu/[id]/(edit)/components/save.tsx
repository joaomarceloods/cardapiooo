import { CheckOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, MenuProps, Space, Spin, message } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { denormalizeState } from '../reducer/normalizr'
import { useReducerDispatch, useReducerState } from '../reducer/provider'
import { Reducer } from '../reducer/types'

const Save = () => {
  const state = useReducerState()
  const dispatch = useReducerDispatch()
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const menuId = state.result
  const touched = state.touched

  const onClickSave = async () => {
    const denormalizedState = denormalizeState(state)

    setSaving(true)
    const res = await fetch('/api/menu', {
      method: 'PUT',
      body: JSON.stringify(denormalizedState),
    })
    setSaving(false)

    if (!res.ok) window.alert('Erro ao salvar. Tente novamente mais tarde.')
    dispatch({ type: Reducer.ActionType.Pristine })
    router.refresh()
  }

  const onClickDelete = async () => {
    const confirmed = window.confirm('Apagar este menu? Não será possível recuperá-lo.')
    if (!confirmed) return

    setSaving(true)

    const res = await fetch('/api/menu', {
      method: 'DELETE',
      body: JSON.stringify({ id: menuId }),
    })

    if (!res.ok) {
      window.alert('Erro ao apagar. Tente novamente mais tarde.')
      setSaving(false)
      return
    }

    router.refresh()
    router.replace(`/admin`)
    message.info('Menu apagado')
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
      <Spin fullscreen spinning={saving} delay={500} />
      <Button title="Apagar" danger onClick={onClickDelete}>
        <DeleteOutlined />
      </Button>
      <Button type={'primary'} onClick={onClickSave} disabled={!touched}>
        {touched ? (
          'Salvar'
        ) : (
          <span>
            <CheckOutlined /> Salvo
          </span>
        )}
      </Button>
    </Space>
  )
}

export default Save
