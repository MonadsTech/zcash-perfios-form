import React from "react";
import { Button, Form, Input } from "antd";

const EnachUserForm = (props) => {
  const { onFinish, loading, initialValues } = props;
  console.log("Enach user form initialValues", initialValues);

  return (
    <Form
      layout="vertical"
      name="nest-messages"
      onFinish={onFinish}
      initialValues={initialValues}
    >
      {/* consumerMobileNo */}
      <Form.Item
        required="true"
        name="consumerMobileNo"
        label="consumerMobileNo"
      >
        <Input />
      </Form.Item>

      {/* consumerEmailId */}
      <Form.Item required="true" name="consumerEmailId" label="consumerEmailId">
        <Input />
      </Form.Item>

      {/* accountNo */}
      <Form.Item required="true" name="accountNo" label="accountNo">
        <Input />
      </Form.Item>

      {/* accountHolderName */}
      <Form.Item
        name="accountHolderName"
        label="accountHolderName"
        required="true"
      >
        <Input />
      </Form.Item>

      {/* ifscCode */}
      <Form.Item name="ifscCode" label="ifscCode" required="true">
        <Input />
      </Form.Item>

      <Form.Item style={{ textAlign: "center" }}>
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export { EnachUserForm };
