import { Card, Button, InputNumber, Space, Typography } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { increment, decrement, incrementByAmount } from '@/store/slices/counterSlice'
import { useState } from 'react'

const { Title } = Typography

function Counter() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()
  const [amount, setAmount] = useState<number>(5)

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <Space direction="vertical" size="large" className="w-full">
          <Title level={2}>Redux 计数器示例</Title>
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-500 mb-6">{count}</div>
            <Space size="middle">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => dispatch(increment())}
                size="large"
              >
                增加
              </Button>
              <Button
                type="primary"
                danger
                icon={<MinusOutlined />}
                onClick={() => dispatch(decrement())}
                size="large"
              >
                减少
              </Button>
            </Space>
          </div>
          <div className="border-t pt-6">
            <Space>
              <InputNumber
                value={amount}
                onChange={(value) => setAmount(value || 0)}
                min={-100}
                max={100}
              />
              <Button
                onClick={() => dispatch(incrementByAmount(amount))}
              >
                增加指定数量
              </Button>
            </Space>
          </div>
        </Space>
      </Card>
    </div>
  )
}

export default Counter

