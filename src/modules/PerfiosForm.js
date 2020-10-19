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

  const formRef = React.useRef();

  React.useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  return (
    <form
      ref={formRef}
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
    </form>
  );
};
