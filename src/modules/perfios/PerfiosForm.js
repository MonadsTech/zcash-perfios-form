import React from "react";
import { Input } from "antd";

const PERFIOS_URL = `https://demo.perfios.com/KuberaVault/insights/start`;

export const PerfiosForm = (props) => {
  const { payloadData } = props;

  const formRef = React.createRef();

  React.useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, [formRef]);

  return (
    <form ref={formRef} action={PERFIOS_URL} method="POST">
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
