import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { PutBlobResult } from '@vercel/blob'
import { Upload, UploadProps, message } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import Image from 'next/image'
import { FC, useState } from 'react'
import { useReducerDispatch, useReducerState } from '../../provider/provider'
import { Entity, Reducer } from '../../provider/types'

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
      <div style={{ marginTop: 8 }}>Photo</div>
    </div>
  )

  // TODO: move menuId and itemId into `data` prop
  return (
    <Upload
      name="photo"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action={`/api/product-photo?menu=${menuId}&item=${itemId}`}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {loading ? (
        uploadButton
      ) : photo ? (
        <div style={{ position: 'relative', width: 84, height: 84 }}>
          <Image src={photo} alt="Product photo" fill objectFit="cover" />
        </div>
      ) : (
        uploadButton
      )}
    </Upload>
  )
}

export default ProductPhoto
