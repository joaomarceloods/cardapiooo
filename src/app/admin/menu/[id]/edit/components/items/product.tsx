import { Col, Flex, Form, Input, InputNumber, Row, Space } from 'antd'
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
    <Flex style={{ flex: 1 }} gap={4}>
      <ProductPhoto menuId={menuId} itemId={id} />
      <Row style={{ flex: 1 }} gutter={4}>
        <Col xs={18} md={9}>
          <Space.Compact block>
            <Input
              style={{ fontWeight: 'bold' }}
              placeholder="Product"
              value={title}
              onChange={(e) => handleChange(e.target.value, 'title')}
            />
            <InputNumber
              defaultValue="0"
              value={price}
              onChange={(value) => handleChange(value || '', 'price')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
            />
          </Space.Compact>
        </Col>
        <Col xs={24} md={15}>
          <Input.TextArea
            placeholder="Description"
            rows={1}
            value={description}
            onChange={(e) => handleChange(e.target.value, 'description')}
          />
        </Col>
      </Row>
    </Flex>
  )
}

export default Product
