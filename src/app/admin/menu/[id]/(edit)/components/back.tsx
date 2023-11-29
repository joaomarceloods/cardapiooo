import { LeftOutlined } from '@ant-design/icons'
import Link from 'next/link'

const Back = () => {
  return (
    <Link href={`/admin`}>
      <LeftOutlined />
      Back
    </Link>
  )
}

export default Back
