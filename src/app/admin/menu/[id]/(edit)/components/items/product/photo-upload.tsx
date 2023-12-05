import { LoadingOutlined } from '@ant-design/icons'
import { PutBlobResult } from '@vercel/blob'
import { Space, Upload, UploadProps } from 'antd'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile } from 'antd/es/upload/interface'
import { FC, useState } from 'react'
import { useReducerDispatch, useReducerState } from '../../../reducer/provider'
import { Reducer } from '../../../reducer/types'

const PhotoUpload: FC<{
  menuId: string
  itemId: string
  onChange: (photoUrl: string) => void
}> = ({ menuId, itemId, onChange }) => {
  const [loading, setLoading] = useState(false)

  const beforeUpload = (file: RcFile) => {
    const isValidFormat = /image\/jpeg|png|webp/.test(file.type)
    if (!isValidFormat) {
      window.alert('Você só pode enviar imagens JPG, PNG ou WEBP')
    }
    const isValidSize = file.size / 1024 / 1024 < 4.5
    if (!isValidSize) {
      window.alert('A imagem deve ser menor que 4.5MB')
    }
    return isValidFormat && isValidSize
  }

  const onChangeUpload: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    switch (info.file.status) {
      case 'uploading':
        setLoading(true)
        break
      case 'done':
        setLoading(false)
        const blob: PutBlobResult = info.file.response
        onChange(blob.url)
        break
      case 'error':
        setLoading(false)
        window.alert('Erro ao enviar a foto')
        break
      case 'removed':
        setLoading(false)
        break
    }
  }

  // TODO: move menuId and itemId into `data` prop
  return (
    <div role="button" aria-label="Photo" style={{ cursor: 'pointer' }}>
      <Upload
        name="photo"
        listType="text"
        showUploadList={false}
        action={`/api/product-photo?menu=${menuId}&item=${itemId}`}
        beforeUpload={beforeUpload}
        onChange={onChangeUpload}
        disabled={loading}
      >
        {loading ? (
          <Space>
            Enviando imagem
            <LoadingOutlined />
          </Space>
        ) : (
          'Escolher imagem'
        )}
      </Upload>
    </div>
  )
}

const PhotoUploadContainer: FC<{ itemId: string }> = ({ itemId }) => {
  const state = useReducerState()
  const menuId = state.result

  const dispatch = useReducerDispatch()
  const onChange = (photoUrl: string) => {
    dispatch({
      type: Reducer.ActionType.ChangeItem,
      payload: { value: photoUrl, id: itemId, property: 'photo' },
    })
  }

  return <PhotoUpload itemId={itemId} menuId={menuId} onChange={onChange} />
}

export default PhotoUploadContainer
