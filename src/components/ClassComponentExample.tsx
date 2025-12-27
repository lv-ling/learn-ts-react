import { Component } from "react";
import { Card, Typography, Button, Space } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

interface ClassComponentState {
  count: number;
  currentTime: string;
}

class ClassComponentExample extends Component<{}, ClassComponentState> {
  private timerId: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      count: 0,
      currentTime: new Date().toLocaleTimeString("zh-CN"),
    };
  }

  componentDidMount() {
    // 组件挂载后启动定时器
    this.timerId = setInterval(() => {
      this.setState({
        currentTime: new Date().toLocaleTimeString("zh-CN"),
      });
    }, 1000);
  }

  componentWillUnmount() {
    // 组件卸载前清除定时器
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  handleIncrement = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };

  handleDecrement = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  };

  render() {
    const { count, currentTime } = this.state;

    return (
      <Card>
        <Space direction="vertical" size="large" className="w-full">
          <div>
            <Title level={4}>Class 组件示例</Title>
            <Paragraph>
              这是一个使用 Class
              组件语法编写的组件，展示了生命周期方法和状态管理。
            </Paragraph>
          </div>

          <div className="text-center">
            <div className="mb-4">
              <ClockCircleOutlined className="text-blue-500 text-2xl mr-2" />
              <Text strong className="text-lg">
                当前时间: {currentTime}
              </Text>
            </div>

            <div className="mb-4">
              <Text className="text-2xl">计数器: </Text>
              <Text className="text-4xl font-bold text-blue-500">{count}</Text>
            </div>

            <Space>
              <Button type="primary" onClick={this.handleIncrement}>
                增加
              </Button>
              <Button onClick={this.handleDecrement}>减少</Button>
            </Space>
          </div>
        </Space>
      </Card>
    );
  }
}

export default ClassComponentExample;
