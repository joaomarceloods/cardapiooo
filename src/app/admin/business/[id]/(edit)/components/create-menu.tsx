import { PlusOutlined } from '@ant-design/icons'
import { Button, ButtonProps, Spin } from 'antd'
import { FC } from 'react'
import useCreateMenu from '../hooks/useNewMenu'

const CreateMenu: FC<{ buttonProps?: ButtonProps }> = ({ buttonProps }) => {
  const [createMenu, saving] = useCreateMenu()

  return (
    <>
      <Button onClick={createMenu} disabled={saving} {...buttonProps}>
        <PlusOutlined />
        New menu
      </Button>
      <Spin spinning={saving} fullscreen />
    </>
  )
}

export default CreateMenu
