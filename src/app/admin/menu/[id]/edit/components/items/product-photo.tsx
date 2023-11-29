import {
  CameraOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { PutBlobResult } from '@vercel/blob'
import { Avatar, Upload, UploadProps, message } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import Image from 'next/image'
import { FC, useState } from 'react'
import { useReducerDispatch, useReducerState } from '../../reducer/provider'
import { Entity, Reducer } from '../../reducer/types'

const beforeUpload = (file: RcFile) => {
  const isValidFormat = /image\/jpeg|png|webp/.test(file.type)
  if (!isValidFormat) {
    message.error('You can only upload JPG, PNG or WEBP images')
  }
  const isValidSize = file.size / 1024 / 1024 < 4.5
  if (!isValidSize) {
    message.error('Image must be smaller than 4.5MB')
  }
  return isValidFormat && isValidSize
}

const ProductPhoto: FC<{ menuId: string; itemId: string }> = ({
  menuId,
  itemId,
}) => {
  const state = useReducerState()
  const item = state.entities.items[itemId]
  const { photo } = item.data as Entity.ProductData

  const dispatch = useReducerDispatch()
  const [loading, setLoading] = useState(false)

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
    } else if (info.file.status === 'done') {
      setLoading(false)
      const blob: PutBlobResult = info.file.response
      dispatch({
        type: Reducer.ActionType.ChangeItem,
        payload: { value: blob.url, id: itemId, property: 'photo' },
      })
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <span>Photo</span>
    </div>
  )

  // TODO: move menuId and itemId into `data` prop
  return (
    <div role="button" aria-label="Photo" style={{ cursor: 'pointer' }}>
      <Upload
        name="photo"
        listType="text"
        showUploadList={false}
        action={`/api/product-photo?menu=${menuId}&item=${itemId}`}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {loading ? (
          <Avatar shape="square" size="small" icon={<LoadingOutlined />} />
        ) : photo ? (
          <Avatar
            shape="square"
            size="small"
            src={<Image src={photo} alt="Photo" width={22} height={22} />}
          />
        ) : (
          <Avatar shape="square" size="small" icon={<CameraOutlined />} />
        )}
      </Upload>
    </div>
  )
}

export default ProductPhoto
