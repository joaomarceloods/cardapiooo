import { FC, PropsWithChildren } from 'react'

const Identation: FC<PropsWithChildren> = ({ children }) => {
  return <div style={{ paddingLeft: 60 }}>{children}</div>
}

export default Identation
