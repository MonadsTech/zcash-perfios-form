import { Layout, message } from "antd";
import React, { useEffect, useState } from "react";
import { API_STATUS } from "../common/utils/api";
import { getAllQueryParams } from "../common/utils/url";
// import { EnachUserForm } from "../modules/enach/EnachUserForm";
import { Helmet } from "react-helmet";
import { to } from "await-to-js";
// import { v4 as uuidV4 } from "uuid";
import { LoadingIndicator } from "../common/components/LoadingIndicator";

const ENACH_TOKEN_API = `https://zavron.byts.in/v1/payment/enach/token`;
const MERCHANT_ID = "T596349";
const INITIAL_VALUES = {
  // txnId: uuidV4().split("-").join(""),
  txnId: "0060w000004l4mLAAQ",
  consumerMobileNo: "7877523772",
  consumerEmailId: "rajatvijay5@gmail.com",
  accountNo: "919010053812087",
  accountHolderName: "Rajat Vijay",
  ifscCode: "UTIB0000335",
};

/**
 * Calls the API to fetch token,
 * using data from app, default config and form data
 * Returns promises that resolves to the token
 * @param {Record<string,string>} payload
 */
const getToken = (payload) => {
  return fetch(ENACH_TOKEN_API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((response) => response.payload.token);
};

const EnachScreen = () => {
  const [initialFormData, setInitialFormData] = useState(INITIAL_VALUES);
  console.log("initialFormData", initialFormData);
  const [status, setStatus] = useState(API_STATUS.IDLE);

  /**
   * 1. Load data from the app aka consumerData
   * 2. Load data from the query params aka queryData
   * 3. Merge them in the same order
   * consumerData, queryData =
   * {
   *  consumerMobileNo: string,
   *  consumerEmailId: string,
   *  accountNo: string,
   *  accountHolderName: string,
   *  ifscCode: string
   * }
   */
  useEffect(() => {
    const queryData = getAllQueryParams();
    console.log("EnachScreen -> queryData", queryData);

    const dataFromApp = window.EnachData || {};
    setInitialFormData((oldValue) => ({
      // ...oldValue,
      ...dataFromApp,
      ...queryData,
    }));
    // setInitialFormData({
    //   ...dataFromApp,
    //   ...queryData,
    // });
  }, []);

  /**
   * Called when the user submits the form
   * Orchestrate the main data flow
   * data from -> calling ENACH SDK
   * @param {{
   *  consumerMobileNo: string,
   *  consumerEmailId: string,
   *  accountNo: string,
   *  accountHolderName: string,
   *  ifscCode: string
   * }} formValues
   * @returns {void}
   */
  const handleFinish = React.useCallback(
    async (formValuesForm) => {
      const formValues = initialFormData;
      console.log("handleFinish -> formValues", formValues);
      console.log("handleFinish -> formValues", initialFormData);
      // const txnId = "3ba0bd3a5c7d42908ee25dcb2f57e29b";
      // const txnId = uuidV4().split("-").join("");
      const {
        txnId,
        accountNo,
        consumerMobileNo,
        consumerEmailId,
        accountHolderName,
        ifscCode,
      } = formValues;
      const token = await getTokenUsingFormData({
        txnId,
        accountNo,
        consumerMobileNo,
        consumerEmailId,
      });
      const finalConfig = getENACHConfig({
        token,
        responseHandler,
        consumerMobileNo,
        consumerEmailId,
        bankCode: 9480,
        accountNo,
        accountHolderName,
        ifscCode,
        txnId,
      });
      if (token) {
        openENACHModal(finalConfig);
      }
    },
    [initialFormData]
  );

  /**
   * Fetches token from Zavron backend
   * @param {{
   *  txnId: string,
   *  accountNo: string,
   *  consumerEmailId: string,
   *  consumerMobileNo: string,
   * }} config
   */
  const getTokenUsingFormData = async ({
    txnId,
    accountNo,
    consumerEmailId,
    consumerMobileNo,
  }) => {
    setStatus(API_STATUS.LOADING);

    const payload = {
      txn_id: txnId,
      total_amount: "1",
      account_number: accountNo,
      email_id: consumerEmailId,
      mobile_number: consumerMobileNo,
      debit_start_date: "",
      consumer_id: "",
      debit_end_date: "",
      max_amount: "",
      amount_type: "",
      frequency: "",
      card_number: "",
      exp_month: "",
      exp_year: "",
      cvv_code: "",
      merchantId: MERCHANT_ID,
    };

    console.log("EnachScreen: getTokenUsingFormData payload ", payload);

    // API call
    setStatus(API_STATUS.LOADING);
    const [error, token] = await to(getToken(payload));
    if (!error && token) {
      setStatus(API_STATUS.RESOLVED);
      return token;
    } else {
      setStatus(API_STATUS.REJECTED);
      message.error(error.message);
      return null;
    }
  };

  /**
   * Opens the ENACH Modal using the config
   * @param {Record<string,string>} config Toke for ENACH
   */
  const openENACHModal = (config) => {
    console.log("EnachScreen: openENACHModal config ", config);

    const configJson = {
      tarCall: false,
      features: {
        // showPGResponseMsg: true,
        enableAbortResponse: true,
        enableNewWindowFlow: false,
        // enableExpressPay: false,
        // payDetailsAtMerchantEnd: true,
        // enableSI: false,
        // showAllModesWithSI: false,
        // siDetailsAtMerchantEnd: false,
        // hideSIDetails: false,
        // enableDebitDay: false,
        // expandSIDetails: false,
        // hideSIConfirmation: false,
        // showSIResponseMsg: false,
      },
      consumerData: config,
    };
    console.log(
      "EnachScreen: openENACHModal payload ",
      JSON.stringify(configJson, null, 4)
    );

    window.$.pnCheckout(configJson);
    if (configJson.features.enableNewWindowFlow) {
      window.pnCheckoutShared.openNewWindow();
    }
  };

  React.useEffect(() => {
    setStatus(API_STATUS.LOADING);
    const jQueryWatcher = setInterval(() => {
      if (window.$ && window.$.pnCheckout && !!initialFormData.accountNo) {
        clearInterval(jQueryWatcher);
        handleFinish();
      }
    }, 100);

    return () => clearInterval(jQueryWatcher);
  }, [handleFinish, initialFormData]);

  /**
   * TODO: Implement me!
   * Callback from ENACH SDK
   * @param {string} res
   */
  const responseHandler = (res) => {
    console.log("enachResponseHandler -> res", res);
  };

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
          src="https://www.tecprocesssolution.com/proto/p2m/client/lib/jquery.min.js"
          type="text/javascript"
        ></script>
        <script
          type="text/javascript"
          src="https://www.paynimo.com/paynimocheckout/server/lib/checkout.js"
        ></script>
      </Helmet>
      {/* <EnachUserForm
        initialValues={initialFormData}
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

export { EnachScreen };

function getENACHConfig({
  token,
  responseHandler,
  consumerMobileNo,
  consumerEmailId,
  bankCode,
  accountNo,
  accountHolderName,
  ifscCode,
  txnId,
}) {
  return {
    deviceId: "WEBSH2",
    token,
    returnUrl: "https://zavron.byts.in/v1/payment/enach/response",
    // returnUrl: "https://postman-echo.com/post",
    responseHandler,
    paymentMode: "netBanking",
    customStyle: {
      PRIMARY_COLOR_CODE: "#FFFFFF",
      SECONDARY_COLOR_CODE: "#001F79",
      BUTTON_COLOR_CODE_1: "#000F3D",
      BUTTON_COLOR_CODE_2: "#FFFFFF",
    },
    merchantLogoUrl:
      "https://res.cloudinary.com/dhoiqmk4x/image/upload/v1595829219/ZCash_Logo_1_n2cdan.png", //provided merchant logo will be displayed
    merchantMsg: "",
    disclaimerMsg: "",
    merchantId: MERCHANT_ID,
    consumerMobileNo,
    consumerEmailId,
    txnId,
    // txnType: "SALE",
    // txnSubType: "DEBIT",
    items: [
      {
        itemId: "First",
        amount: "1",
        comAmt: "0",
      },
    ],
    cartDescription: "",
    bankCode, // AXIS: 9480
    accountNo,
    accountType: "Saving",
    accountHolderName,
    ifscCode,

    // TODO: Check if this is required!
    currency: "INR",
  };
}
