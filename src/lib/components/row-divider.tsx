import Identation from '@/lib/components/identation'
import { Divider } from 'antd'

const RowDivider = () => {
  return (
    <Identation right={0}>
      <Divider style={{ margin: 0 }} />
    </Identation>
  )
}

export default RowDivider
