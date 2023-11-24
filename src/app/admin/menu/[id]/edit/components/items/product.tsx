import { Col, Form, Input, InputNumber, Row } from 'antd'
import { FC } from 'react'
import { useReducerDispatch, useReducerState } from '../../provider/provider'
import { Entity, Reducer } from '../../provider/types'
import ProductPhoto from './product-photo'

const Product: FC<{ id: string }> = ({ id }) => {
  const state = useReducerState()
  const dispatch = useReducerDispatch()
  const menuId = state.result
  const item = state.entities.items[id]
  const { title, price, description } = item.data as Entity.ProductData

  const handleChange = (value: string, property: string) => {
    dispatch({
      type: Reducer.ActionType.ChangeItem,
      payload: { value, id, property },
    })
  }

  const [form] = Form.useForm()

  return (
    <>
      <ProductPhoto menuId={menuId} itemId={id} />
      <Row style={{ flex: 1 }} gutter={[4, 4]}>
        <Col xs={18} lg={6}>
          <Input
            size="small"
            bordered={false}
            placeholder="Enter product name…"
            value={title}
            onChange={(e) => handleChange(e.target.value, 'title')}
            style={{ fontSize: '1rem' }}
          />
        </Col>
        <Col xs={6} lg={6}>
          <InputNumber
            defaultValue="0"
            size="small"
            bordered={false}
            value={price}
            onChange={(value) => handleChange(value || '', 'price')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            style={{ width: '100%', fontSize: '1rem' }}
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
    </>
  )
}

export default Product
