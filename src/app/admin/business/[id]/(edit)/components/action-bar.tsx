import Identation from '@/lib/components/identation'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Flex, Spin, theme } from 'antd'
import useCreateMenu from '../hooks/useNewMenu'
import Save from './save'

const ActionBar = () => {
  const { token } = theme.useToken()
  const [createMenu, saving] = useCreateMenu()

  return (
    <Identation>
      <Flex justify="space-between" style={{ paddingBlock: token.margin }}>
        <Button type="link" onClick={createMenu} style={{ paddingInline: 0 }}>
          <PlusOutlined />
          New menu
        </Button>
        <Save />
        <Spin fullscreen spinning={saving} />
      </Flex>
    </Identation>
  )
}

export default ActionBar
