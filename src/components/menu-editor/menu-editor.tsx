'use client'

import { FC } from 'react'
import Menu from './components/menu'
import { MenuEditorProvider } from './provider/provider'
import { Reducer } from './provider/types'

const MenuEditor: FC<{ initialState: Reducer.State }> = ({ initialState }) => {
  return (
    <MenuEditorProvider initialState={initialState}>
      <Menu />
    </MenuEditorProvider>
  )
}

export default MenuEditor
