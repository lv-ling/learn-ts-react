import { Typography, Space, Divider } from 'antd';
import ClassComponentExample from '@/components/ClassComponentExample';
import FunctionComponentExample from '@/components/FunctionComponentExample';

const { Title, Paragraph } = Typography;

function ComponentComparison() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <Title level={2}>Class 组件 vs 函数组件</Title>
        <Paragraph>
          在 React 中，你可以同时使用 Class 组件和函数组件。它们可以互相调用和组合使用。
        </Paragraph>
      </div>

      <Space direction="vertical" size="large" className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ClassComponentExample />
          <FunctionComponentExample />
        </div>

        <Divider />

        <div className="bg-gray-50 p-6 rounded-lg">
          <Title level={4}>使用建议：</Title>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              <strong>函数组件 + Hooks：</strong>
              现代 React 开发的首选方式，代码更简洁，性能更好
            </li>
            <li>
              <strong>Class 组件：</strong>
              适用于需要复杂生命周期逻辑的场景，或者维护旧代码
            </li>
            <li>
              <strong>混合使用：</strong>
              完全可以在同一个项目中同时使用，它们可以互相调用
            </li>
            <li>
              <strong>迁移策略：</strong>
              可以逐步将 Class 组件迁移为函数组件，无需一次性全部迁移
            </li>
          </ul>
        </div>
      </Space>
    </div>
  );
}

export default ComponentComparison;

