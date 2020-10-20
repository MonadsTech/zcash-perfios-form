{  
  MerchantCode : T596349
  SchemeCode: First
  Salt: 6545673570WDLVYF 

  
  deviceId: WEBMD5
  txnType: SALE
  txnSubType: DEBIT
  paymentMode: all
  items: [{itemId: First, amount: 1, comAmt: 0}]
  enableExpressPay: false
  payDetailsAtMerchantEnd: true 
  enableSI: false
  showAllModesWithSI: false
  siDetailsAtMerchantEnd: false
  hideSIDetails: false
  enableDebitDay: false
  expandSIDetails: false
  hideSIConfirmation: false
  showSIResponseMsg: false
  enableNewWindowFlow: false 
}



// ---------------- what we have stuff

const consumerData = {
  'deviceId': 'WEBMD5',
  'token': '<FROM API>',
  'returnUrl': '<?>',    //merchant response page URL
  'responseHandler': handleResponse, //custom fn @pankajvaghela 
  'paymentMode': 'all',
  'merchantLogoUrl': '<zavron image>',  //provided merchant logo will be displayed
  'merchantId': 'L3348', //? you mean merchant code?
  'currency': 'INR',
  // 'consumerId': 'c964634',//* only form SI //! form?   //Your unique consumer identifier to register a eMandate/eNACH
  'consumerMobileNo': '9876543210',//! form?
  'consumerEmailId': 'test@test.com',//! form?
  'txnId': '1481197581115',//! form?   //Unique merchant transaction ID
  'items': [{
      'itemId': 'First', // Scheme code
      'amount': '1',
      'comAmt': '0'
  }],
  'customStyle': {
      'PRIMARY_COLOR_CODE': '#3977b7',   //merchant primary color code
      'SECONDARY_COLOR_CODE': '#FFFFFF',   //provide merchant's suitable color code
      'BUTTON_COLOR_CODE_1': '#1969bb',   //merchant's button background color code
      'BUTTON_COLOR_CODE_2': '#FFFFFF'   //provide merchant's suitable color code for button text
  },
  //'accountNo': '1234567890',    //Pass this if accountNo is captured at merchant side for eMandate/eNACH
  //'accountHolderName': 'Name',  //Pass this if accountHolderName is captured at merchant side for ICICI eMandate & eNACH registration this is mandatory field, if not passed from merchant Customer need to enter in Checkout UI.
  //'ifscCode': 'ICIC0000001',        //Pass this if ifscCode is captured at merchant side.
  'accountType': 'Saving', //! form?  //Required for eNACH registration this is mandatory field

  //* enableSI pe chahiye
  // 'debitStartDate': '10-03-2019',//! form?
  // 'debitEndDate': '01-03-2047',//! form?
  // 'maxAmount': '100',//! form?
  // 'amountType': 'M',//! form?
  // 'frequency': 'ADHO',//! form?	//  Available options DAIL, WEEK, MNTH, QURT, MIAN, YEAR, BIMN and ADHO


  bankCode: 9480,
  //*extra
  'enableNewWindowFlow': false,

}
  






// ----------------Required stuff

const consumerData = {
'deviceId': 'WEBSH2',	//possible values 'WEBSH1', 'WEBSH2' and 'WEBMD5'
'token': '37b0b9dd68cceafdf8dd38142803c0babc7073c3042547dc6060660ba50ac5cd043ddf0a27bdcbddc2cab2a0a28cbf51b30ecc2176e617304745f825655b1ff9',
'returnUrl': 'https://www.tekprocess.co.in/MerchantIntegrationClient/MerchantResponsePage.jsp',    //merchant response page URL
'responseHandler': handleResponse,
'paymentMode': 'netBanking',
'merchantLogoUrl': 'https://www.paynimo.com/CompanyDocs/company-logo-md.png',  //provided merchant logo will be displayed
'merchantId': 'L3348',
'currency': 'INR',
'consumerId': 'c964634',  //Your unique consumer identifier to register a eMandate/eNACH
'consumerMobileNo': '9876543210',
'consumerEmailId': 'test@test.com',
'txnId': '1481197581115',   //Unique merchant transaction ID
'items': [{
    'itemId': 'test',
    'amount': '5',
    'comAmt': '0'
}],
'customStyle': {
    'PRIMARY_COLOR_CODE': '#3977b7',   //merchant primary color code
    'SECONDARY_COLOR_CODE': '#FFFFFF',   //provide merchant's suitable color code
    'BUTTON_COLOR_CODE_1': '#1969bb',   //merchant's button background color code
    'BUTTON_COLOR_CODE_2': '#FFFFFF'   //provide merchant's suitable color code for button text
},
//'accountNo': '1234567890',    //Pass this if accountNo is captured at merchant side for eMandate/eNACH
//'accountHolderName': 'Name',  //Pass this if accountHolderName is captured at merchant side for ICICI eMandate & eNACH registration this is mandatory field, if not passed from merchant Customer need to enter in Checkout UI.
//'ifscCode': 'ICIC0000001',        //Pass this if ifscCode is captured at merchant side.
'accountType': 'Saving',  //Required for eNACH registration this is mandatory field
'debitStartDate': '10-03-2019',
'debitEndDate': '01-03-2047',
'maxAmount': '100',
'amountType': 'M',
'frequency': 'ADHO'	//  Available options DAIL, WEEK, MNTH, QURT, MIAN, YEAR, BIMN and ADHO
}
