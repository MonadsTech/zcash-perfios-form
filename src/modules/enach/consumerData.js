export const ConsumerDataDefault = {
  deviceId: "WEBMD5",
  // 'token': '<FROM API>',
  returnUrl: "https://postman-echo.com/post",
  // 'responseHandler': handleResponse, //custom fn @pankajvaghela

  paymentMode: "netBanking", // cant be alll cuz we are passing it ourselves
  merchantLogoUrl:
    "https://res.cloudinary.com/dhoiqmk4x/image/upload/v1595829219/ZCash_Logo_1_n2cdan.png", //provided merchant logo will be displayed
  merchantId: "T596349", // merchant code
  currency: "INR",
  // 'consumerId': 'c964634',// only form SI   //Your unique consumer identifier to register a eMandate/eNACH
  consumerMobileNo: "9999999911", //* from opty
  consumerEmailId: "test@test.com", //* from opty
  txnId: "1481197581115", //* same as token api   //Unique merchant transaction ID
  txnType: "SALE",
  txnSubType: "DEBIT",
  items: [
    {
      itemId: "First", // Scheme code
      amount: "1",
      comAmt: "0",
    },
  ],
  customStyle: {
    PRIMARY_COLOR_CODE: "#FFFFFF", //merchant primary color code
    SECONDARY_COLOR_CODE: "#001F79", //provide merchant's suitable color code
    BUTTON_COLOR_CODE_1: "#000F3D", //merchant's button background color code
    BUTTON_COLOR_CODE_2: "#FFFFFF", //provide merchant's suitable color code for button text
  },
  //'accountNo': '1234567890',//* form    //Pass this if accountNo is captured at merchant side for eMandate/eNACH
  //'accountHolderName': 'Name',//* form  //Pass this if accountHolderName is captured at merchant side for ICICI eMandate & eNACH registration this is mandatory field, if not passed from merchant Customer need to enter in Checkout UI.
  //'ifscCode': 'ICIC0000001',//* form    //Pass this if ifscCode is captured at merchant side.
  accountType: "Saving", //! form?  //Required for eNACH registration this is mandatory field

  //* enableSI pe chahiye
  // 'debitStartDate': '10-03-2019',//! form?
  // 'debitEndDate': '01-03-2047',//! form?
  // 'maxAmount': '100',//! form?
  // 'amountType': 'M',//! form?
  // 'frequency': 'ADHO',//! form?	//  Available options DAIL, WEEK, MNTH, QURT, MIAN, YEAR, BIMN and ADHO

  bankCode: 9480,
};
