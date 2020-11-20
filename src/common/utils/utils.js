export const reactNativePostMessage = (...args) => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(...args);
  } else {
    console.log("MessageForApp", ...args);
  }
};
