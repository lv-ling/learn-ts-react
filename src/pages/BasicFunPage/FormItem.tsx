import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Space, theme } from "antd";

const AdvancedSearchForm = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorWhite,
    borderRadius: token.borderRadiusLG,
    marginBottom: 16,
  };

  const getFields = () => {
    const count = expand ? 10 : 6;
    const children: React.ReactNode[] = [];
    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          {i % 3 !== 1 ? (
            <Form.Item
              name={`field-${i}`}
              label={`Field ${i}`}
              style={{
                marginBottom: 10,
              }}
              rules={[
                {
                  required: true,
                  message: "Input something!",
                },
              ]}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          ) : (
            <Form.Item
              name={`field-${i}`}
              label={`Field ${i}`}
              style={{
                marginBottom: 10,
              }}
              rules={[
                {
                  required: true,
                  message: "Select something!",
                },
              ]}
              initialValue="1"
            >
              <Select
                options={[
                  {
                    value: "1",
                    label:
                      "longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong",
                  },
                  {
                    value: "2",
                    label: "222",
                  },
                ]}
              />
            </Form.Item>
          )}
        </Col>
      );
    }
    return children;
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      form={form}
      className="p-2"
      name="advanced_search_form1"
      style={formStyle}
      onFinish={onFinish}
    >
      <Row gutter={24}>{getFields()}</Row>
      <div style={{ textAlign: "end" }}>
        <Space size="small">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
          <div
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <DownOutlined rotate={expand ? 180 : 0} /> Collapse
          </div>
        </Space>
      </div>
    </Form>
  );
};

export default AdvancedSearchForm;
