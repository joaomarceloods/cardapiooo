import { CameraOutlined } from '@ant-design/icons'
import { Avatar, Dropdown } from 'antd'
import Image from 'next/image'
import { FC } from 'react'
import { useReducerState } from '../../../reducer/provider'
import { Entity } from '../../../reducer/types'
import PhotoUpload from './photo-upload'

const PhotoDropdown: FC<{
  itemId: string
  photoUrl: string | undefined
}> = ({ itemId, photoUrl }) => {
  const items = [
    {
      key: '1',
      label: <PhotoUpload itemId={itemId} />,
    },
    // {
    //   key: '2',
    //   label: 'Delete image',
    //   danger: true,
    // },
  ]

  return (
    <Dropdown menu={{ items }}>
      <Avatar
        shape="square"
        size="small"
        icon={<CameraOutlined />}
        src={
          photoUrl && (
            <Image
              src={photoUrl}
              alt="Photo"
              fill
              sizes="22px"
              objectFit="cover"
            />
          )
        }
      />
    </Dropdown>
  )
}

const PhotoDropdownContainer: FC<{ itemId: string }> = ({ itemId }) => {
  const state = useReducerState()
  const item = state.entities.items[itemId]
  const { photo } = item.data as Entity.ProductData
  return <PhotoDropdown itemId={itemId} photoUrl={photo} />
}

export default PhotoDropdownContainer
