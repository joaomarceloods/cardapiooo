import { Flex, theme } from 'antd'
import Back from './back'
import Save from './save'

const ActionBar = () => {
  const { token } = theme.useToken()

  return (
    <Flex
      gap="small"
      justify="space-between"
      align="center"
      style={{ padding: token.margin }}
    >
      <Back />
      <Save />
    </Flex>
  )
}

export default ActionBar
