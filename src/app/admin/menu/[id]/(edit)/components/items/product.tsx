import { Col, Input, Row, theme } from 'antd'
import { FC } from 'react'
import { useReducerDispatch, useReducerState } from '../../reducer/provider'
import { Entity, Reducer } from '../../reducer/types'
import ProductPhoto from './product-photo'

const Product: FC<{ id: string }> = ({ id }) => {
  const state = useReducerState()
  const dispatch = useReducerDispatch()
  const menuId = state.result
  const item = state.entities.items[id]
  const { title, price, description } = item.data as Entity.ProductData
  const { token } = theme.useToken()

  const handleChange = (value: any, property: string) => {
    dispatch({
      type: Reducer.ActionType.ChangeItem,
      payload: { value, id, property },
    })
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
    }).format(parseInt(price) / 100)
  }

  const parsePrice = (price: string) => {
    const digitsOnly = price.match(/[0-9]/g)?.join('') || '0'
    return digitsOnly
  }

  return (
    <Row wrap={false} style={{ paddingLeft: token.marginXS }}>
      <Col flex="none">
        <ProductPhoto menuId={menuId} itemId={id} />
      </Col>
      <Col flex="auto">
        <Row>
          <Col xs={16} lg={9}>
            <Input
              size="small"
              bordered={false}
              placeholder="Product name"
              value={title}
              onChange={(e) => handleChange(e.target.value, 'title')}
              style={{ fontSize: '1rem', fontWeight: 'bold' }}
            />
          </Col>
          <Col xs={8} lg={3}>
            <Input
              prefix="R$"
              defaultValue="0"
              size="small"
              inputMode="numeric"
              value={formatPrice(price || '0')}
              onChange={(e) =>
                handleChange(parsePrice(e.target.value), 'price')
              }
              style={{
                fontSize: '1rem',
                maxWidth: '100%',
                lineHeight: '1rem',
              }}
            />
            <style>{'.ant-input-number-input { font-size: 1rem }'}</style>
          </Col>
          <Col xs={24} lg={12}>
            <Input.TextArea
              autoSize
              size="small"
              bordered={false}
              placeholder="Short description"
              rows={1}
              value={description}
              onChange={(e) => handleChange(e.target.value, 'description')}
              style={{ fontSize: '1rem', minHeight: 27 }}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Product
