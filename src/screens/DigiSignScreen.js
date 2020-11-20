import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { API_STATUS } from "../common/utils/api";
import { getAllQueryParams } from "../common/utils/url";

import { Helmet } from "react-helmet";

import { MERCHANT_IMAGE_URL, PRIMARY_COLOR } from "../common/const";

import { reactNativePostMessage } from "../common/utils/utils";
import { LoadingIndicator } from "../common/components/LoadingIndicator";

const DigiSignScreen = () => {
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [initialData, setInitialData] = useState({
    documentId: "DID201121001854309L9WTFDA1SEY7FF",
    // mobileNum: "vpankaj1998@gmail.com",
    mobileNum: "6355267815",
  });

  /**
   * 1. Load data from the app aka consumerData
   * 2. Load data from the query params aka queryData
   * 3. Merge them in the same order
   * consumerData, queryData =
   * {
   *  documentId: string,
   *  mobileNum: string, //email or mobile
   * }
   */
  useEffect(() => {
    const queryData = getAllQueryParams();
    console.log("DigiScreen -> queryData", queryData);

    const dataFromApp = window.consumerData || {};
    reactNativePostMessage(
      JSON.stringify({ result: "success", response: "h" })
    );

    setInitialData((oldValue) => ({
      ...oldValue,
      ...dataFromApp,
      ...queryData,
    }));
  }, []);

  const handleFinish = React.useCallback(async () => {
    const digioOptions = {
      environment: "sandbox",
      callback: function (response) {
        if (response.hasOwnProperty("error_code")) {
          reactNativePostMessage({ result: "error", response });
          return console.log("error occurred in process");
        }
        reactNativePostMessage({ result: "success", response });
        console.log("Signing completed successfully");
      },
      is_iframe: true,
      logo: MERCHANT_IMAGE_URL,
      theme: {
        primaryColor: "#FFFFFF",
        secondaryColor: PRIMARY_COLOR,
      },
    };

    var digio = new window.Digio(digioOptions); //options is the digio options constructor object.
    console.log("digio", digio);
    digio.init();

    const { documentId, mobileNum } = initialData;
    digio.submit(documentId, mobileNum);
  }, [initialData]);

  React.useEffect(() => {
    setStatus(API_STATUS.LOADING);
    const fileLoadWatcher = setInterval(() => {
      if (window.Digio && !!initialData.documentId) {
        clearInterval(fileLoadWatcher);
        handleFinish();
      }
    }, 100);

    return () => clearInterval(fileLoadWatcher);
  }, [handleFinish, initialData]);

  return (
    <Layout
      style={{
        padding: "50px 20px",
      }}
    >
      <Helmet>
        <meta
          name="viewport"
          content="user-scalable=no, width=device-width, initial-scale=1"
        />
        <script
          type="text/javascript"
          src="https://app.digio.in/sdk/v8/digio.js"
        ></script>
      </Helmet>
      {/* DigiSign */}
      {/* <DigioESignForm
        // initialValues={initialFormData}
        loading={status === API_STATUS.LOADING}
        onFinish={handleFinish}
      /> */}
      {status === API_STATUS.LOADING && <LoadingIndicator />}
      {status === API_STATUS.REJECTED && (
        <p style={{ color: "red" }}>
          Some error occurred, please contact support
        </p>
      )}
    </Layout>
  );
};

export { DigiSignScreen };
