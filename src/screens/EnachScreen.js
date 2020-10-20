import { Layout } from "antd";
import React from "react";
import { LoadingIndicator } from "../common/components/LoadingIndicator";
import { API_STATUS } from "../common/utils/api";
import { getAllQueryParams } from "../common/utils/url";
import { ConsumerDataDefault } from "../modules/enach/consumerData";
import { EnachUserForm } from "../modules/enach/EnachUserForm";

// import { UserDataForm } from "./modules/UserDataForm";
// http://localhost:3000/enach?email=ankurj630@gmail.com&loan_amount=1000&loan_duration=24&loan_type=Home&callback_url=https://google.com&txn_id=PQ1342687YTX#edfg

const ENACH_TOKEN_API = `https://zavron.byts.in/v1/payment/enach/token`;

const JQUERY_URL =
  "https://www.paynimo.com/Paynimocheckout/client/lib/jquery.min.js";
const PAYNIMO_URL =
  "https://www.paynimo.com/Paynimocheckout/server/lib/checkout.js";

const buildScriptTag = (src, onload) => {
  const script = document.createElement("script");
  script.src = src;
  script.async = true;
  script.onload = onload;
  return script;
};

const EnachScreen = () => {
  const [consumerData, setConsumerData] = React.useState(null);

  const [apiToken, setApiToken] = React.useState(null);
  const [enachTokenApiStatus, setEnachTokenApiStatus] = React.useState(
    API_STATUS.IDLE
  );

  React.useEffect(() => {
    const queryData = getAllQueryParams();
    console.log("EnachScreen -> queryData", queryData);

    let AppConsumerData = window.Enach?.ConsumerData || {};

    if (queryData.dummy === "1") {
      delete queryData.dummy;
      setConsumerData({
        ...ConsumerDataDefault,
        ...AppConsumerData,
        ...queryData,
      });
    } else if (AppConsumerData) {
      setConsumerData(AppConsumerData);
    }
  }, []);

  const loadEnachScript = React.useCallback(() => {
    const script = buildScriptTag(PAYNIMO_URL, () => {
      console.log("Enach script loaded");
    });
    document.body.appendChild(script);
  }, []);

  React.useEffect(() => {
    const script = buildScriptTag(JQUERY_URL, () => {
      console.log("JQUERY script loaded");
      loadEnachScript();
    });
    document.body.appendChild(script);
  }, [loadEnachScript]);

  const enachResponseHandler = React.useCallback((res) => {
    console.log("enachResponseHandler -> res", res);
  }, []);

  React.useEffect(() => {
    if (apiToken && enachTokenApiStatus === API_STATUS.RESOLVED) {
      console.log("EnachScreen -> apiToken", apiToken);

      var configJson = {
        tarCall: false,
        features: {
          showPGResponseMsg: true,
          enableAbortResponse: true,
          enableExpressPay: false,
          payDetailsAtMerchantEnd: true,
          enableSI: false,
          showAllModesWithSI: false,
          siDetailsAtMerchantEnd: false,
          hideSIDetails: false,
          enableDebitDay: false,
          expandSIDetails: false,
          hideSIConfirmation: false,
          showSIResponseMsg: false,
          enableNewWindowFlow: false,
        },
        consumerData: {
          ...consumerData,
          token: apiToken,
          enachResponseHandler,
        },
      };
      console.log("EnachScreen -> configJson", configJson);

      window.$.pnCheckout(configJson);
    }
  }, [apiToken, consumerData, enachResponseHandler, enachTokenApiStatus]);

  React.useEffect(() => {
    if (consumerData?.accountNo) {
      setEnachTokenApiStatus(API_STATUS.LOADING);

      const dataForTokenAPI = {
        txn_id: consumerData.txnId,
        total_amount: "1", // make it summation later
        account_number: consumerData.accountNo,
        consumer_id: "",
        email_id: consumerData.consumerEmailId,
        mobile_number: consumerData.consumerMobileNo,
        debit_start_date: "",
        debit_end_date: "",
        max_amount: "",
        amount_type: "",
        frequency: "",
        card_number: "",
        exp_month: "",
        exp_year: "",
        cvv_code: "",
      };

      console.log("EnachScreen -> dataForTokenAPI", dataForTokenAPI);

      fetch(ENACH_TOKEN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForTokenAPI),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            setApiToken(data.payload.token);
            setEnachTokenApiStatus(API_STATUS.RESOLVED);
          } else {
            console.log(data.message);
            alert(JSON.stringify(data.message));
            setEnachTokenApiStatus(API_STATUS.REJECTED);
          }
        })
        .catch((err) => {
          setApiToken(null);
          setEnachTokenApiStatus(API_STATUS.REJECTED);
        });
    }
  }, [setEnachTokenApiStatus, consumerData]);

  const onUserFormFinish = (formValues) => {
    console.log("onUserFormFinish -> consumerData", consumerData);

    setConsumerData((value) => ({
      ...value,
      ...formValues,
    }));
  };

  const hasToken = apiToken && !!Object.keys(apiToken).length;

  return (
    <Layout
      style={{
        padding: "50px 20px",
        // alignItems: "center",
        // textAlign: "center",
      }}
    >
      <EnachUserForm onFinish={onUserFormFinish} />
      {/* {hasUserData && <UserDataForm userData={consumerData} />} */}
      {enachTokenApiStatus === API_STATUS.LOADING && <LoadingIndicator />}
      {/* {enachTokenApiStatus === API_STATUS.RESOLVED && hasToken && ( */}
      {/* // <PerfiosForm payloadData={apiToken} /> */}
      {/* )} */}
      {(enachTokenApiStatus === API_STATUS.REJECTED ||
        (enachTokenApiStatus === API_STATUS.RESOLVED && !hasToken)) && (
        <p>Some error occurred, please contact support</p>
      )}
    </Layout>
  );
};

export { EnachScreen };
