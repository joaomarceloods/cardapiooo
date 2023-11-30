import { MenuOutlined } from '@ant-design/icons'
import { Typography, theme } from 'antd'
import { FC, PropsWithChildren } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'

const JustChildren: FC<PropsWithChildren> = ({ children }) => children

const DragHandle: FC<{
  top?: number
  iconWrapper?: FC<PropsWithChildren>
  dragHandleProps: DraggableProvided['dragHandleProps']
}> = ({ top, dragHandleProps, iconWrapper: IconWrapper = JustChildren }) => {
  const { token } = theme.useToken()

  return (
    <div style={{ position: 'relative' }}>
      <div
        {...dragHandleProps}
        style={{
          top,
          width: 44,
          height: 28,
          position: 'absolute',
          paddingLeft: token.margin,
        }}
      >
        <IconWrapper>
          <Typography.Text type="secondary">
            <MenuOutlined />
          </Typography.Text>
        </IconWrapper>
      </div>
    </div>
  )
}

export default DragHandle
