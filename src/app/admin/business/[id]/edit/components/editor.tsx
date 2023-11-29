'use client'

import { FC } from 'react'
import { ReducerProvider } from '../reducer/provider'
import { Reducer } from '../reducer/types'
import Business from './business'

const Editor: FC<{ initialState: Reducer.State }> = ({ initialState }) => {
  return (
    <ReducerProvider initialState={initialState}>
      <Business />
    </ReducerProvider>
  )
}

export default Editor
