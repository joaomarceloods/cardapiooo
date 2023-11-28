import { Divider } from 'antd'
import Identation from './identation'

const RowDivider = () => {
  return (
    <Identation right={0}>
      <Divider style={{ margin: 0 }} />
    </Identation>
  )
}

export default RowDivider
