import { Card, Typography, Space } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <Space direction="vertical" size="large" className="w-full">
          <Title level={2}>欢迎使用 React + Vite + TypeScript</Title>
          <Paragraph>
            这是一个现代化的 React 前端项目模板，集成了以下技术栈：
          </Paragraph>
          <Space direction="vertical" size="middle">
            <div className="flex items-center gap-2">
              <CheckCircleOutlined className="text-green-500" />
              <span>React 18</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleOutlined className="text-green-500" />
              <span>Vite - 快速的构建工具</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleOutlined className="text-green-500" />
              <span>TypeScript - 类型安全</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleOutlined className="text-green-500" />
              <span>Redux Toolkit - 状态管理</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleOutlined className="text-green-500" />
              <span>React Router - 路由管理</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleOutlined className="text-green-500" />
              <span>Tailwind CSS - 原子化 CSS</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleOutlined className="text-green-500" />
              <span>Ant Design - UI 组件库</span>
            </div>
          </Space>
        </Space>
      </Card>
    </div>
  )
}

export default Home

