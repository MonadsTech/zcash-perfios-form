import React from "react";
import { Button, Form, Input } from "antd";

const DigioESignForm = (props) => {
  const { onFinish, loading, initialValues } = props;

  return (
    <Form
      layout="vertical"
      name="nest-messages"
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <Form.Item style={{ textAlign: "center" }}>
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export { DigioESignForm };
