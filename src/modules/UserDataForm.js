import React from "react";
import { Form, Input } from "antd";

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

export const UserDataForm = (props) => {
  const { userData } = props;

  return (
    <Form {...layout} name="nest-messages">
      {Object.keys(userData).map((dataField) => {
        return (
          <Form.Item
            name={["user", dataField]}
            label={dataField}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input defaultValue={userData[dataField]} disabled />
          </Form.Item>
        );
      })}
    </Form>
  );
};
