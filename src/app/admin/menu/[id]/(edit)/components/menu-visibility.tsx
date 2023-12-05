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
  const touched = state.touched
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

    if (!res.ok) window.alert('Erro ao salvar. Tente novamente mais tarde.')
    setSaving(false)
    router.refresh()

    dispatch({
      type: Reducer.ActionType.ChangeMenu,
      payload: { property: 'visible', value: newVisible },
    })

    dispatch({ type: Reducer.ActionType.Pristine })
  }

  if (visible) {
    return (
      <>
        <Spin spinning={saving} fullscreen delay={500} />
        <Alert
          banner
          message="Publicado"
          description="Este menu está visível publicamente."
          type="info"
          action={
            <Flex vertical gap={8}>
              <Button
                ghost
                size="small"
                type="primary"
                danger
                onClick={onClickPublish}
                disabled={touched}
                title={touched ? 'Salve antes' : undefined}
              >
                Despublicar
              </Button>
              <Button
                type="primary"
                ghost
                size="small"
                disabled={touched}
                title={touched ? 'Salve antes' : undefined}
              >
                <Link href={`/${menuId}`} target="_blank">
                  Ver
                </Link>
              </Button>
            </Flex>
          }
        />
      </>
    )
  }

  return (
    <>
      <Spin spinning={saving} fullscreen delay={500} />
      <Alert
        banner
        message="Não publicado"
        description="Quando estiver pronto, clique em Publicar para tornar este menu visível publicamente."
        type="warning"
        action={
          <Flex vertical>
            <Button
              ghost
              size="small"
              type="primary"
              onClick={onClickPublish}
              disabled={touched}
              title={touched ? 'Salve antes' : undefined}
            >
              Publicar
            </Button>
          </Flex>
        }
      />
    </>
  )
}

export default MenuVisibility
