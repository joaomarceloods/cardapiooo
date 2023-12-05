import { message } from 'antd'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useReducerState } from '../reducer/provider'

const useCreateMenu = () => {
  const router = useRouter()
  const state = useReducerState()
  const business = state.result
  const [saving, setSaving] = useState(false)

  const createMenu = async () => {
    const title = window.prompt(
      'Qual o nome do menu? Pode ser o nome do restaurante ou algo específico, ex.: "Drinks"'
    )

    if (!title) {
      message.info("Cancelado. O nome do menu não pode ficar em branco.")
      return
    }

    setSaving(true)

    const res = await fetch('/api/menu', {
      method: 'POST',
      body: JSON.stringify({ title, business }),
    })

    if (!res.ok) {
      setSaving(false)
      window.alert('Erro ao criar o menu. Tente novamente mais tarde.')
      return
    }

    const menu = await res.json()
    router.push(`/admin/menu/${menu.id}`)
    router.refresh()
  }

  return [createMenu, saving] as const
}

export default useCreateMenu
