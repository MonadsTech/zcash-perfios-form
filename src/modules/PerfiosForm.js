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

  return (
    <form
      action="https://demo.perfios.com/KuberaVault/insights/start"
      method="POST"
    >
      {Object.keys(payloadData).map((dataField) => {
        return (
          <Input
            key={dataField}
            name={dataField}
            defaultValue={payloadData[dataField]}
            hidden
          />
        );
      })}

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </form>
  );
};
