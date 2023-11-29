import { Flex, theme } from 'antd'
import Back from './back'
import SaveButton from './save-button'

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
      <SaveButton />
    </Flex>
  )
}

export default ActionBar
