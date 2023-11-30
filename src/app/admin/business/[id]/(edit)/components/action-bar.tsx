import { Flex, theme } from 'antd'
import CreateMenu from './create-menu'
import Save from './save'

const ActionBar = () => {
  const { token } = theme.useToken()

  return (
    <Flex
      gap="small"
      justify="space-between"
      align="center"
      style={{ padding: token.margin, paddingLeft: token.marginXXL }}
    >
      <CreateMenu />
      <Save />
    </Flex>
  )
}

export default ActionBar
