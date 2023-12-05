import { Button } from 'antd'
import { FC } from 'react'
import { useReducerDispatch } from '../../../reducer/provider'
import { Reducer } from '../../../reducer/types'

const PhotoDelete: FC<{ onDelete: () => void }> = ({ onDelete }) => {
  const onClick = () => {
    const confirmed = window.confirm("Delete photo? It can't be undone.")
    if (!confirmed) return
    onDelete()
  }

  return (
    <span onClick={onClick}>
      Delete photo
    </span>
  )
}

const PhotoDeleteContainer: FC<{ itemId: string }> = ({ itemId }) => {
  const dispatch = useReducerDispatch()

  const onDelete = () => {
    dispatch({
      type: Reducer.ActionType.ChangeItem,
      payload: { id: itemId, property: 'photo', value: undefined },
    })
  }

  return <PhotoDelete onDelete={onDelete} />
}

export default PhotoDeleteContainer
