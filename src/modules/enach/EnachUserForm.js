import React from "react";
import { Button, Form, Input } from "antd";

const layout = {
  labelCol: {
    span: 4,
    md: {
      offset: 2,
    },
  },
  wrapperCol: {
    span: 12,
  },
};

export const EnachUserForm = (props) => {
  const { onFinish } = props;

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish}>
      <Form.Item
        name={"accountNo"}
        label={"accountNo"}
        rules={[
          {
            required: true,
          },
        ]}
        initialValue=""
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"accountHolderName"}
        label={"accountHolderName"}
        rules={[
          {
            required: true,
          },
        ]}
        initialValue=""
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"ifscCode"}
        label={"ifscCode"}
        rules={[
          {
            required: true,
          },
        ]}
        initialValue=""
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
