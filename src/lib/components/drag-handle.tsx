import { MenuOutlined } from '@ant-design/icons'
import { theme } from 'antd'
import { FC, PropsWithChildren } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'

const JustChildren: FC<PropsWithChildren> = ({ children }) => children

const DragHandle: FC<{
  top?: number
  iconWrapper?: FC<PropsWithChildren>
  dragHandleProps: DraggableProvided['dragHandleProps']
}> = ({
  top = 4,
  dragHandleProps,
  iconWrapper: IconWrapper = JustChildren,
}) => {
  const { token } = theme.useToken()

  return (
    <div {...dragHandleProps}>
      <IconWrapper>
        <MenuOutlined
          style={{ color: token.colorTextDisabled, padding: token.marginXS }}
        />
      </IconWrapper>
    </div>
  )
}

export default DragHandle
