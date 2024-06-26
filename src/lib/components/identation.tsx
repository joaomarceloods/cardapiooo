import { theme } from 'antd'
import { FC, PropsWithChildren } from 'react'

export const identationValue = 44

const Identation: FC<PropsWithChildren<{ left?: number; right?: number }>> = ({
  children,
  left,
  right,
}) => {
  const { token } = theme.useToken()
  if (left == null) left = token.margin
  if (right == null) right = token.margin

  return (
    <div style={{ paddingLeft: left, paddingRight: right }}>{children}</div>
  )
}

export default Identation
