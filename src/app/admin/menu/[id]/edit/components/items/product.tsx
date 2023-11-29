import { Col, Input, InputNumber, Row, theme } from 'antd'
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

  const handleChange = (value: string, property: string) => {
    dispatch({
      type: Reducer.ActionType.ChangeItem,
      payload: { value, id, property },
    })
  }

  return (
    <Row wrap={false} style={{ paddingLeft: token.marginXS }}>
      <Col flex="none">
        <ProductPhoto menuId={menuId} itemId={id} />
      </Col>
      <Col flex="auto">
        <Row>
          <Col xs={18} lg={6}>
            <Input
              size="small"
              bordered={false}
              placeholder="Enter product name…"
              value={title}
              onChange={(e) => handleChange(e.target.value, 'title')}
              style={{ fontSize: '1rem', fontWeight: 'bold' }}
            />
          </Col>
          <Col xs={6} lg={6}>
            <InputNumber
              defaultValue="0"
              size="small"
              value={price}
              onChange={(value) => handleChange(value || '', 'price')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              style={{ maxWidth: '100%', fontSize: '1rem' }}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
            />
          </Col>
          <Col xs={24} lg={12}>
            <Input.TextArea
              autoSize
              size="small"
              bordered={false}
              placeholder="Description (max. 2 lines recommended)"
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
