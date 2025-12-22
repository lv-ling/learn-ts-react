import {
  Card,
  Typography,
  Space,
  DatePicker,
  Table,
  Pagination,
  Button,
  Modal,
  message,
} from "antd";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";

const { Title, Paragraph } = Typography;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "地址",
    dataIndex: "address",
    key: "address",
  },
];

const dataSource: DataType[] = [
  {
    key: "1",
    name: "张三",
    age: 32,
    address: "北京市朝阳区",
  },
  {
    key: "2",
    name: "李四",
    age: 28,
    address: "上海市浦东新区",
  },
];

function LocaleDemo() {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleOk = () => {
    message.success("操作成功");
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Card>
        <Space direction="vertical" size="large" className="w-full">
          <div>
            <Title level={2}>Ant Design 国际化示例</Title>
            <Paragraph>
              以下组件都使用了 ConfigProvider
              配置的中文语言包，所有文本都是中文显示。
            </Paragraph>
          </div>

          <div>
            <Title level={4}>1. DatePicker（日期选择器）</Title>
            <DatePicker placeholder="选择日期" />
          </div>

          <div>
            <Title level={4}>2. Table（表格）</Title>
            <Table
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
          </div>

          <div>
            <Title level={4}>3. Pagination（分页）</Title>
            <Pagination
              total={85}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `共 ${total} 条`}
            />
          </div>

          <div>
            <Title level={4}>4. Modal（对话框）</Title>
            <Button type="primary" onClick={showModal}>
              打开对话框
            </Button>
            <Modal
              title="提示"
              open={modalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>这是一个使用中文语言包的对话框</p>
            </Modal>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <Title level={4}>说明</Title>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                如果没有配置{" "}
                <code className="bg-gray-200 px-1 rounded">locale="zhCN"</code>
                {"，"}这些组件会显示英文
              </li>
              <li>ConfigProvider 包裹的整个组件树都会使用相同的语言配置</li>
              <li>可以在运行时动态切换语言</li>
            </ul>
          </div>
        </Space>
      </Card>
    </div>
  );
}

export default LocaleDemo;
