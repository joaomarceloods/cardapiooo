import { LeftOutlined } from '@ant-design/icons'
import { Space } from 'antd'
import Link from 'next/link'

const Back = () => {
  return (
    <Link href={`/admin`}>
      <Space>
        <LeftOutlined />
        Back
      </Space>
    </Link>
  )
}

export default Back
