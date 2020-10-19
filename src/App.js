import { Layout } from "antd";
import React from "react";
import { LoadingIndicator } from "./common/components/LoadingIndicator";
import { API_STATUS } from "./common/utils/api";
import { getAllQueryParams } from "./common/utils/url";
import { PerfiosForm } from "./modules/PerfiosForm";

import { UserDataForm } from "./modules/UserDataForm";

// http://localhost:3000/?email=ankurj630@gmail.com&loan_amount=1000&loan_duration=24&loan_type=Home&callback_url=https://google.com&txn_id=PQ1342687YTX#edfg

function App() {
  const [userData, setUserData] = React.useState(null);
  const [apiXmlData, setApiXmlData] = React.useState(null);
  const [perfiosStartApiStatus, setPerfiosStartApiStatus] = React.useState(
    API_STATUS.IDLE
  );
  // console.log("App -> userData", userData);
  // console.log("App -> apiXmlData", apiXmlData);

  React.useEffect(() => {
    setUserData(getAllQueryParams());
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

  const hasUserData = userData && !!Object.keys(userData).length;
  const hasApiXmlData = apiXmlData && !!Object.keys(apiXmlData).length;

  return (
    <div className="App">
      <Layout
        style={{
          padding: "50px 20px",
          // alignItems: "center",
          // textAlign: "center",
        }}
      >
        {/* Hello World */}
        {/* <pre>{FormData}</pre> */}
        {/* {userData && Object.keys(userData).map((k) => `${k}=${userData[k]}&`)} */}
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
}

export default App;
