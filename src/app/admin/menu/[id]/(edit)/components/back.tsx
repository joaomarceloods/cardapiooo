import { LeftOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import Link from 'next/link'

const Back = () => {
  return (
    <Link href={`/admin`}>
      <Space>
        <LeftOutlined />
        Voltar
      </Space>
    </Link>
  )
}

export default Back
