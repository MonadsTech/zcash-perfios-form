import { Layout } from "antd";
import React from "react";
import { LoadingIndicator } from "../common/components/LoadingIndicator";
import { API_STATUS } from "../common/utils/api";
import { getAllQueryParams } from "../common/utils/url";
import { PerfiosForm } from "../modules/perfios/PerfiosForm";

// import { UserDataForm } from "./modules/UserDataForm";
// http://localhost:3000/perfios?email=ankurj630@gmail.com&loan_amount=1000&loan_duration=24&loan_type=Home&callback_url=https://google.com&txn_id=PQ1342687YTX#edfg

const dummyUserData = {
  email: "vpankaj1998@gmail.com",
  loan_amount: 1000,
  loan_duration: 24,
  loan_type: "Home",
  callback_url: "https://google.com",
  txn_id: "a0G0w000000qOqEEAU",
};

// const userData = {
//   email: "vpankaj1998o@fesnjne.com" || "",
//   // email: optyData.Account.PersonEmail || "",
//   loan_amount: 1000,
//   loan_duration: 24,
//   loan_type: "Home",
//   callback_url: "https://google.com",
//   txn_id: "a0G0w000000qOqEEAU",
//   // txn_id: 'PQ1342687YTX',
// };

const PerfiosScreen = () => {
  const [userData, setUserData] = React.useState(null);
  const [apiXmlData, setApiXmlData] = React.useState(null);
  const [perfiosStartApiStatus, setPerfiosStartApiStatus] = React.useState(
    API_STATUS.IDLE
  );

  React.useEffect(() => {
    const queryData = getAllQueryParams();
    console.log("PerfiosScreen -> queryData", queryData);

    let UserData = window.Perfios?.UserData || {};

    if (queryData.dummy === "1") {
      delete queryData.dummy;
      setUserData({
        ...dummyUserData,
        ...UserData,
        ...queryData,
      });
    } else if (UserData) {
      setUserData(UserData);
    }
  }, []);

  React.useEffect(() => {
    if (userData) {
      setPerfiosStartApiStatus(API_STATUS.LOADING);
      fetch("https://zavron.byts.in/v1/payment/perfios/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          setApiXmlData(data.payload);
          setPerfiosStartApiStatus(API_STATUS.RESOLVED);
        })
        .catch((err) => {
          setApiXmlData(null);
          setPerfiosStartApiStatus(API_STATUS.REJECTED);
        });
    }
  }, [setPerfiosStartApiStatus, userData]);

  // const hasUserData = userData && !!Object.keys(userData).length;
  const hasApiXmlData = apiXmlData && !!Object.keys(apiXmlData).length;

  return (
    <div className="App">
      {/* <code>{JSON.stringify(userData)}</code> */}
      {/* <code>{JSON.stringify(window.Perfios)}</code> */}
      <Layout
        style={{
          padding: "50px 20px",
          // alignItems: "center",
          // textAlign: "center",
        }}
      >
        {/* {hasUserData && <UserDataForm userData={userData} />} */}
        {perfiosStartApiStatus === API_STATUS.LOADING && <LoadingIndicator />}
        {perfiosStartApiStatus === API_STATUS.RESOLVED && hasApiXmlData && (
          <PerfiosForm payloadData={apiXmlData} />
        )}
        {(perfiosStartApiStatus === API_STATUS.REJECTED ||
          (perfiosStartApiStatus === API_STATUS.RESOLVED &&
            !hasApiXmlData)) && (
          <p>Some error occurred, please contact support</p>
        )}
      </Layout>
    </div>
  );
};

export { PerfiosScreen };
