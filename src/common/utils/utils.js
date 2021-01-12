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
