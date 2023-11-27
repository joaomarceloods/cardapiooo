import { FC, PropsWithChildren } from 'react'

const Identation: FC<PropsWithChildren<{ left?: number; right?: number }>> = ({
  children,
  left = 44,
  right = 0,
}) => {
  return (
    <div style={{ paddingLeft: left, paddingRight: right }}>{children}</div>
  )
}

export default Identation
