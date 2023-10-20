'use client'

import Menu from './components/menu'
import { BoardProvider } from './provider/provider'

const MenuEditor = () => {
  return (
    <BoardProvider>
      <Menu />
    </BoardProvider>
  )
}

export default MenuEditor
