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
      'What is the name of the menu? It can be the restaurant\'s name or something specific i.e. "Drinks"'
    )

    if (!title) {
      message.info("Canceled. Menu name can't be empty.")
      return
    }

    setSaving(true)

    const res = await fetch('/api/menu', {
      method: 'POST',
      body: JSON.stringify({ title, business }),
    })

    if (!res.ok) {
      setSaving(false)
      window.alert('Error creating the menu. Please try again later.')
      return
    }

    const menu = await res.json()
    router.push(`/admin/menu/${menu.id}`)
    router.refresh()
  }

  return [createMenu, saving] as const
}

export default useCreateMenu
