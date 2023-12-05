import { CameraOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import Image from 'next/image'
import { FC } from 'react'
import { useReducerState } from '../../../reducer/provider'
import { Entity } from '../../../reducer/types'
import PhotoDeleteContainer from './photo-delete'
import PhotoUpload from './photo-upload'

const PhotoDropdown: FC<{
  itemId: string
  photoUrl: string | undefined
}> = ({ itemId, photoUrl }) => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <PhotoUpload itemId={itemId} />,
    },
  ]

  if (photoUrl) {
    items.push({
      key: '2',
      label: <PhotoDeleteContainer itemId={itemId} />,
      danger: true,
    })
  }

  return (
    <Dropdown menu={{ items }}>
      <Button size="small" type="text" style={{ padding: 0 }}>
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
      </Button>
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
