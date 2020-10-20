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
          // ...ExampleData.features, // uncomment this to use example data
        },
        consumerData: {
          ...consumerData,
          // ...ExampleData.consumerData, // uncomment this to use example data
          token: apiToken,
          enachResponseHandler,
        },
      };
      console.log("EnachScreen -> configJson", configJson);

      // window.$.pnCheckout(ExampleData); // for example data
      window.$.pnCheckout(configJson);
    }
  }, [apiToken, consumerData, enachResponseHandler, enachTokenApiStatus]);

  React.useEffect(() => {
    const _data = consumerData;
    // const _data = ExampleData.consumerData; //  uncomment this to use example data

    // if (consumerData?.deviceId) { //  uncomment this to while using example data
    if (consumerData?.accountNo) {
      setEnachTokenApiStatus(API_STATUS.LOADING);

      const totalAmount = _data.items.reduce(
        (sum, item) => (sum += Number.parseInt(item.amount)),
        0
      );
      console.log("EnachScreen -> totalAmount", totalAmount);
      const dataForTokenAPI = {
        txn_id: _data.txnId,
        total_amount: `${totalAmount}`, // make it summation later
        account_number: _data.accountNo,
        consumer_id: "",
        // consumer_id: _data.consumerId, //for example data
        email_id: _data.consumerEmailId,
        mobile_number: _data.consumerMobileNo,
        debit_start_date: "",
        debit_end_date: "",
        max_amount: "",
        amount_type: "",
        frequency: "",
        card_number: "",
        exp_month: "",
        exp_year: "",
        cvv_code: "",
        merchantId: _data.merchantId,
      };

      console.log("EnachScreen -> dataForTokenAPI", dataForTokenAPI);

      fetch(ENACH_TOKEN_API, {
        method: "POST",
        headers: {
          Accept: "application/json",
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

const handleEgResponse = (res) => {
  console.log("handleEgResponse -> res)", res);
};
const ExampleData = {
  tarCall: false,
  features: {
    showPGResponseMsg: true,
    enableAbortResponse: true,
    enableNewWindowFlow: false, //for hybrid applications please disable this by passing false
    enableExpressPay: true,
    siDetailsAtMerchantEnd: true,
    enableSI: true,
  },
  consumerData: {
    deviceId: "WEBMD5", //possible values 'WEBSH1', 'WEBSH2' and 'WEBMD5'
    token:
      "37b0b9dd68cceafdf8dd38142803c0babc7073c3042547dc6060660ba50ac5cd043ddf0a27bdcbddc2cab2a0a28cbf51b30ecc2176e617304745f825655b1ff9",
    returnUrl:
      "https://www.tekprocess.co.in/MerchantIntegrationClient/MerchantResponsePage.jsp", //merchant response page URL
    responseHandler: handleEgResponse,
    paymentMode: "netBanking",
    merchantLogoUrl: "https://www.paynimo.com/CompanyDocs/company-logo-md.png", //provided merchant logo will be displayed
    merchantId: "L3348",
    currency: "INR",
    // consumerId: "c964634", //Your unique consumer identifier to register a eMandate/eNACH
    consumerId: "T596349",
    consumerMobileNo: "9876543210",
    consumerEmailId: "test@test.com",
    txnId: "1481197581115", //Unique merchant transaction ID
    items: [
      {
        itemId: "test",
        amount: "1",
        comAmt: "0",
      },
    ],
    customStyle: {
      PRIMARY_COLOR_CODE: "#3977b7", //merchant primary color code
      SECONDARY_COLOR_CODE: "#FFFFFF", //provide merchant's suitable color code
      BUTTON_COLOR_CODE_1: "#1969bb", //merchant's button background color code
      BUTTON_COLOR_CODE_2: "#FFFFFF", //provide merchant's suitable color code for button text
    },
    accountNo: "", //Pass this if accountNo is captured at merchant side for eMandate/eNACH
    //'accountNo': '1234567890',    //Pass this if accountNo is captured at merchant side for eMandate/eNACH
    //'accountHolderName': 'Name',  //Pass this if accountHolderName is captured at merchant side for ICICI eMandate & eNACH registration this is mandatory field, if not passed from merchant Customer need to enter in Checkout UI.
    //'ifscCode': 'ICIC0000001',        //Pass this if ifscCode is captured at merchant side.
    // accountType: "Saving", //Required for eNACH registration this is mandatory field
    // debitStartDate: "10-03-2019",
    // debitEndDate: "01-03-2047",
    // maxAmount: "100",
    // amountType: "M",
    // frequency: "ADHO", //  Available options DAIL, WEEK, MNTH, QURT, MIAN, YEAR, BIMN and ADHO
  },
};
