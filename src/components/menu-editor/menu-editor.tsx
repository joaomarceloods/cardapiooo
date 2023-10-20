'use client'

import Menu from './components/menu'
import { BoardProvider } from './provider/board-provider'

const MenuEditor = () => {
  return (
    <BoardProvider>
      <Menu />
    </BoardProvider>
  )
}

export default MenuEditor
