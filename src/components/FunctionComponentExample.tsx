import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Space } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

function FunctionComponentExample() {
  const [count, setCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('zh-CN')
  );

  useEffect(() => {
    // 组件挂载后启动定时器
    const timerId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('zh-CN'));
      console.log(1)
    }, 1000);

    // 组件卸载前清除定时器（清理函数）
    return () => {
      console.log('组件卸载，清除定时器');
      clearInterval(timerId);
    };
  }, []); // 空依赖数组表示只在挂载和卸载时执行

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <Card>
      <Space direction="vertical" size="large" className="w-full">
        <div>
          <Title level={4}>函数组件示例</Title>
          <Paragraph>
            这是一个使用函数组件语法编写的组件，使用 Hooks 来管理状态和副作用。
          </Paragraph>
        </div>

        <div className="text-center">
          <div className="mb-4">
            <ClockCircleOutlined className="text-green-500 text-2xl mr-2" />
            <Text strong className="text-lg">
              当前时间: {currentTime}
            </Text>
          </div>

          <div className="mb-4">
            <Text className="text-2xl">计数器: </Text>
            <Text className="text-4xl font-bold text-green-500">{count}</Text>
          </div>

          <Space>
            <Button type="primary" onClick={handleIncrement}>
              增加
            </Button>
            <Button onClick={handleDecrement}>减少</Button>
          </Space>
        </div>
      </Space>
    </Card>
  );
}

export default FunctionComponentExample;

