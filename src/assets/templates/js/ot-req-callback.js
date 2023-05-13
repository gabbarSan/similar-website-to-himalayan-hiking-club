/***
Description: To create and return an HTTP Request object and then be used by calling functions
Returns: HTTP Request object
***/
function httpRequestObject(){
  var xmlhttp;
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xmlhttp;
}

/***
Description: To set the url prifix to generate the absolute paths for ulrs.
Return: string, url_prefix.
***/
function getURLPrefix(){
  var url_prefix="";
  if(document.location.hostname=="localhost")
    url_prefix="http://localhost/outdoor/";
  else
    url_prefix = "http://"+document.location.hostname+"/";

  return url_prefix;
}

/***
Description: sends an async request to call the php page that submits the request call back info to DB.
Returns: the responseText of the operation performed by the php page.
***/
function submitRequestCallBackInfo(usrNameHTMLEleId, usrPhoneHTMLEleId, usrEmailHTMLEleId, usrMsgHTMLEleId, displayMsgHTMLEleId, submitBtnHTMLEleId){

    // Asynchronous javascript call to server php page (start)
    var xmlhttp = httpRequestObject();
    xmlhttp.onreadystatechange=function()
      {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          // assign the HTML to the respective tag
          displayMsgHTMLEleId.innerHTML=xmlhttp.responseText;
          
          submitBtnHTMLEleId.disabled = true;
        }
      }

    var IsValidated = validateRequestCallBackInfo(usrNameHTMLEleId, usrPhoneHTMLEleId, usrEmailHTMLEleId, usrMsgHTMLEleId, displayMsgHTMLEleId);

    if(IsValidated){
      var url = getURLPrefix() + "php/common/ot-request-call-back-info-submit.php?";
      xmlhttp.open("POST",url,true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send("usrName="+usrNameHTMLEleId.value+"&usrPhone="+usrPhoneHTMLEleId.value+
        "&usrEmail="+usrEmailHTMLEleId.value+"&usrMsg="+usrMsgHTMLEleId.value);
    }
    // Asynchronous javascript call to server php page (end)
}

/************************************************************Section 3 - Validations*****************************************************/

/***
Description: validates the request call back info keyed in by the user.
Returns: true or false. false in case the validation fails.
***/
function validateRequestCallBackInfo(usrNameHTMLEleId, usrPhoneHTMLEleId, usrEmailHTMLEleId, usrMsgHTMLEleId, displayMsgHTMLEleId){

  // validate User Name
  var usrName = usrNameHTMLEleId.value;
  if(usrName.length==0 || usrName==null || usrName==""){
    displayMsgHTMLEleId.innerHTML="<div class='alert alert-danger fade in'><a href='#' class='close' data-dismiss='alert'></a><strong>Error!</strong> Please fill in your name.</div>";
    usrNameHTMLEleId.focus();
    return false;
  }
  if(!lengthDefine(usrNameHTMLEleId, 200, displayMsgHTMLEleId)){
    usrNameHTMLEleId.focus();
    return false;
  }
  if(!isSpclChar(usrNameHTMLEleId, displayMsgHTMLEleId)){
    usrNameHTMLEleId.focus();
    return false;
  }
  // validate phone number
  var usrPhone = usrPhoneHTMLEleId.value;
  if(usrPhone.length==0 || usrPhone==null || usrPhone==""){
    displayMsgHTMLEleId.innerHTML="<div class='alert alert-danger fade in'><a href='#' class='close' data-dismiss='alert'></a><strong>Error!</strong> Please provide mobile number.</div>";
    usrPhoneHTMLEleId.focus();
    return false;
  }
  else if(!validatePhoneNumber(usrPhoneHTMLEleId, displayMsgHTMLEleId)){
    usrPhoneHTMLEleId.focus();
    return false;
  }

  // validate email ID
  var usrEmail = usrEmailHTMLEleId.value;
  if(usrEmail.length==0 || usrEmail==null || usrEmail==""){
    displayMsgHTMLEleId.innerHTML="<div class='alert alert-danger fade in'><a href='#' class='close' data-dismiss='alert'></a><strong>Error!</strong> Please provide your email ID.</div>";
    usrEmailHTMLEleId.focus();
    return false;
  }
  if(!validateEmailID(usrEmailHTMLEleId, displayMsgHTMLEleId)){
    usrEmailHTMLEleId.focus();
    return false;
  }
  if(!lengthDefine(usrEmailHTMLEleId, 200, displayMsgHTMLEleId)){
    usrEmailHTMLEleId.focus();
    return false;
  }
  if(!isSpclChar(usrEmailHTMLEleId, displayMsgHTMLEleId)){
    usrEmailHTMLEleId.focus();
    return false;
  }
  // validate Message
  if(!lengthDefine(usrMsgHTMLEleId, 2000, displayMsgHTMLEleId)){
    displayMsgHTMLEleId.innerHTML="<div class='alert alert-danger fade in'><a href='#' class='close' data-dismiss='alert'></a><strong>Error!</strong> Message too long! Please enter less than 2000 chars in the message.</div>";
    usrMsgHTMLEleId.focus();
    return false;
  }
  return true;
}
/***
Description: restrict the length of the data entered into text feilds.
Returns: true or false. false in case the validation fails.
***/
function lengthDefine(inputText, maxLength, displayMsgHTMLEleId){
  var uInput = inputText.value;
  if(uInput.length <= maxLength){
    return true;
  }else{
    displayMsgHTMLEleId.innerHTML="<div class='alert alert-danger fade in'><a href='#' class='close' data-dismiss='alert'></a><strong>Error!</strong> Max Length allowed is "+maxLength+" chars.</div>";
    inputText.focus();
    return false;
  }
}

/***
Description: restrict the input of special chars in text feilds text feilds.
Returns: true or false. false in case the validation fails.
***/
function isSpclChar(inputText, displayMsgHTMLEleId){
var iChars = "!#$%^&*()+=[]\\\';,/{}|\":<>?",
    return_val = 0;
for (var i = 0; i < inputText.value.length; i++) {
    if (iChars.indexOf(inputText.value.charAt(i)) != -1) {
      // alert ("The box has special characters. \nThese are not allowed.\n");
      displayMsgHTMLEleId.innerHTML="<div class='alert alert-danger fade in'><a href='#' class='close' data-dismiss='alert'></a><strong>Error!</strong> Special chars are not allowed. Please remove any of these "+iChars+" chars and try submitting again..</div>";
      return_val = return_val + 1;
      return false;
    }
  }
  if(return_val==0) return true;
} 
/***
Description: validates the phone number keyed in by the user.
Returns: true or false. false in case the validation fails.
***/
function validatePhoneNumber(inputNumber, displayMsgHTMLEleId){  
  var phoneno = /^\d{10}$/;
  if(!(inputNumber.value.match(phoneno)))
  {
    displayMsgHTMLEleId.innerHTML="<div class='alert alert-danger fade in'><a href='#' class='close' data-dismiss='alert'></a><strong>Error!</strong> Please enter a valid 10 digit mobile number.</div>";
    inputNumber.focus();
    return false;
  }
  else return true;
}
/***
Description: validates the email ID keyed in by the user.
Returns: true or false. false in case the validation fails.
***/
function validateEmailID(inputEmailID, displayMsgHTMLEleId) {
  // var emailID = inputEmail.value;
  var atpos = inputEmailID.value.indexOf("@");
  var dotpos = inputEmailID.value.lastIndexOf(".");
  if (atpos<1 || dotpos<atpos+2 || dotpos+2>=inputEmailID.value.length) {
    displayMsgHTMLEleId.innerHTML="<div class='alert alert-danger fade in'><a href='#' class='close' data-dismiss='alert'></a><strong>Error!</strong> Please enter a valid email ID.</div>";
    inputEmailID.focus();
    return false;
  }
  else return true;
}
