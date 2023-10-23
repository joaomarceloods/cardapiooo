'use client'

import Menu from './components/menu'
import { MenuEditorProvider } from './provider/provider'
import { MenuEditorState } from './provider/types'

const MenuEditor = ({ menuProps }: { menuProps: MenuEditorState.Menu }) => {
  return (
    <MenuEditorProvider initialState={menuProps}>
      <Menu />
    </MenuEditorProvider>
  )
}

export default MenuEditor
