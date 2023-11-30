import Identation from '@/lib/components/identation'
import { Flex, theme } from 'antd'
import CreateMenu from './create-menu'
import Save from './save'

const ActionBar = () => {
  const { token } = theme.useToken()

  return (
    <Identation>
      <Flex justify="space-between" style={{ paddingBlock: token.margin }}>
        <CreateMenu />
        <Save />
      </Flex>
    </Identation>
  )
}

export default ActionBar
