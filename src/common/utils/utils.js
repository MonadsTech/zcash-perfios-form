import { format } from "date-fns";

export const reactNativePostMessage = (...args) => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(...args);
  } else {
    console.log("MessageForApp", ...args);
  }
};

/**
 * format date to DD-MM-YYYY,
 * @param string date
 */
export const formatDate = (date) => {
  var dd = date.getDate();
  var mm = date.getMonth() + 1;

  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  return `${dd}-${mm}-${date.getFullYear()}`;
};

export const makeQstring = (a) => {
  return Object.keys(a).reduce(
    (q, key, i) => `${q}${key}=${a[key]}${i === a.length - 1 ? "" : "&"}`,
    "?"
  );
};

const EMAIL_TO = "tech@zavronfinserv.com";

export const sendEmail$$ = (_subject, data) => {
  if (!data) {
    return;
  }

  const subject = _subject + " - " + format(new Date(), "yyyy/MM/dd-HH:mm:ss");
  const finalData = {
    subject,
    data,
  };

  const message = JSON.stringify(finalData, null, 3);
  console.log("message", message);

  // if (CURRENT_ENVIRONMENT !== ENVIRONMENTS.PRODUCTION) {
  //   return Promise.resolve(true);
  // }

  return fetch(
    "https://mr5hsijgej.execute-api.ap-south-1.amazonaws.com/send-email-python",
    {
      method: "POST",
      body: JSON.stringify({
        email: EMAIL_TO,
        subject,
        message: `<pre>${message}</pre>`,
      }),
    }
  ).catch((err) => {
    console.log("SendEmail API err", err.message);
  });
};
