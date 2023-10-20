'use client'

import Menu from './components/menu'
import { BoardProvider } from './provider/board-provider'

const Board = () => {
  return (
    <BoardProvider>
      <Menu />
    </BoardProvider>
  )
}

export default Board
