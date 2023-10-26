'use client'

import { FC } from 'react'
import { Provider } from '../provider/provider'
import { Reducer } from '../provider/types'
import Menu from './menu'

const Editor: FC<{ initialState: Reducer.State }> = ({ initialState }) => {
  return (
    <Provider initialState={initialState}>
      <Menu />
    </Provider>
  )
}

export default Editor
