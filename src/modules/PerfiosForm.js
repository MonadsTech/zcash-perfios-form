import React from "react";
import { Form, Input, Button } from "antd";

const layout = {
  labelCol: {
    span: 4,
    offset: 2,
  },
  wrapperCol: {
    span: 12,
  },
};

export const PerfiosForm = (props) => {
  const { payloadData } = props;

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form {...layout} name="nest-messages" onFinish={onFinish}>
      {Object.keys(payloadData).map((dataField) => {
        return <Input defaultValue={payloadData[dataField]} disabled hidden />;
      })}

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
