'use client'

import { FC } from 'react'
import { Provider } from '../provider/provider'
import { Reducer } from '../provider/types'
import Business from './business'

const Editor: FC<{ initialState: Reducer.State }> = ({ initialState }) => {
  return (
    <Provider initialState={initialState}>
      <Business />
    </Provider>
  )
}

export default Editor
