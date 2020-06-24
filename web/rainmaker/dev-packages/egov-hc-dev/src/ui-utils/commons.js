
import { handleScreenConfigurationFieldChange as handleField, prepareFinalObject, toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId, getUserInfo, setapplicationMode, setapplicationNumber } from "egov-ui-kit/utils/localStorageUtils";
import get from "lodash/get";
import set from "lodash/set";
import store from "redux/store";
import { getTranslatedLabel } from "../ui-config/screens/specs/utils";
import { httpRequest } from "./api";



const role_name = JSON.parse(getUserInfo()).roles[0].code


export const getLocaleLabelsforTL = (label, labelKey, localizationLabels) => {
  if (labelKey) {
    let translatedLabel = getTranslatedLabel(labelKey, localizationLabels);
    if (!translatedLabel || labelKey === translatedLabel) {
      return label;
    } else {
      return translatedLabel;
    }
  } else {
    return label;
  }
};
export const getSearchResultsEmployeeRequestFilter = async (queryObject,state, dispatch) => {
  try {
    
    let fromDate= get(state.screenConfiguration.preparedFinalObject,"serviceRequests.fromDate")
    let toDate= get(state.screenConfiguration.preparedFinalObject,"serviceRequests.toDate")
    let servicerequestid = get(state.screenConfiguration.preparedFinalObject, "serviceRequests.servicerequestid") 
    let servicetype = get(state.screenConfiguration.preparedFinalObject, "serviceRequests.servicetype")
    let servicestatus = get(state.screenConfiguration.preparedFinalObject, "serviceRequests.servicestatus")
    let mohalla = get(state.screenConfiguration.preparedFinalObject, "serviceRequests.mohalla")
    let contactNumber = get(state.screenConfiguration.preparedFinalObject, "serviceRequests.contactNumber")
    var dateFromObject = new Date(fromDate);
    var dateToObject = new Date(toDate);
    let fromDateNumeric = dateFromObject.getTime() 
    let toDateNumeric = dateToObject.getTime()
    var oneDayDifference = 60 * 60 * 24 * 1000
    if (fromDateNumeric === toDateNumeric){
      toDateNumeric = toDateNumeric + oneDayDifference
    }
      var data = {
        "fromDate":fromDateNumeric,
        "toDate": toDateNumeric,
        "service_request_id":servicerequestid,
        "serviceType":servicetype,
        "serviceRequestStatus":servicestatus,
        "streetName":mohalla,
        "ownerContactNumber":contactNumber
      
    }
   
    
    
    console.log("$$$$query object", queryObject)
    const response = await httpRequest(
      "post",
      "/hc-services/serviceRequest/_get",
      "",
      [],
      data
      
    );
    
    
    
    
    
    
    
    
    
    
    
    return response;
  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }
};
export const getSearchResults = async queryObject => {
  let data = {
    "iscitizen" : 1
  };
  try {
    const response = await httpRequest(
      "post",
      "/hc-services/serviceRequest/_get",
      "",
      [],
      data
    );
    
    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};

export const getCurrentAssigneeUserNameAndRole = async (dispatch,userId) => {
  // debugger
  let tenantId = "ch.chandigarh";
  // /egov-hrms/employees
  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      `/egov-hrms/employees/_search?ids=${userId}&tenantId=${tenantId}`,
      "_search",  
      [],
      
    );
    return(payload)
   
  } catch (e) {
    console.log(e);
  }};

export const getSearchResultsForFilters = async (filterdata) => {
  
  let data = filterdata

  try {
    const response = await httpRequest(
      "post",
      "/hc-services/serviceRequest/_get",
      "",
      [],
      data
    );

    return response;

  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true,
        { labelName: error.message, labelCode: error.message },
        "error"
      )
    );
  }

};


export const getSearchResultsView = async queryObject => {
  try {
    
    const response = await httpRequest(
      "post", "hc-services/serviceRequest/_getDetail", "",
      [],
      {
        "service_request_id": queryObject[1].value
        }
      
    );
    return response;
  } catch (error) {
    store.dispatch(
      toggleSnackbar(
        true, { labelName: error.message, labelCode: error.message }, "error"
      )
    );
  }
  
};
export const furnishServiceRequestDetailResponse = response => {

  let refurnishresponse = {};
  let serviceRequestDetail = response.ResponseBody[0].length > 0 ? JSON.parse(response.ResponseBody[0]) : '';

  let serviceType
  if (response.ResponseBody[0].service_type == "PRUNING OF TREES GIRTH LESS THAN OR EQUAL TO 90 CMS"){
    serviceType = "Pruning of Trees Girth less than or equal to 90 cms"
  }
 else if(response.ResponseBody[0].service_type == "PRUNING OF TREES GIRTH GREATER THAN 90 CMS"){
  serviceType = "Pruning of Trees Girth greater than 90 cms"
  }
  else if(response.ResponseBody[0].service_type == "REMOVAL OF OVERGROWN/GREEN TREES"){
    serviceType = "Removal of Overgrown/Green Trees"
  }
  else if(response.ResponseBody[0].service_type == "REMOVAL OF DEAD/DANGEROUS/DRY TREES"){
    serviceType = "Removal of Dead/Dangerous/Dry Trees"
  }
  else{
    serviceType = ""
  }
  set(refurnishresponse, "contactNumber", response.ResponseBody[0].contact_number);
  set(refurnishresponse, "mohalla", response.ResponseBody[0].street_name);
  set(refurnishresponse, "description", response.ResponseBody[0].description);
  set(refurnishresponse, "ownerName", response.ResponseBody[0].owner_name);
  set(refurnishresponse, "tenantId", response.ResponseBody[0].tenant_id);
  set(refurnishresponse, "email", response.ResponseBody[0].email_id);
  set(refurnishresponse, "mohalla", response.ResponseBody[0].locality);
  set(refurnishresponse, "houseNoAndStreetName", response.ResponseBody[0].street_name);
  set(refurnishresponse, "landmark", response.ResponseBody[0].landmark);
  set(refurnishresponse, "latitude", response.ResponseBody[0].latitude);
  set(refurnishresponse, "longitude", response.ResponseBody[0].longitude);
  set(refurnishresponse, "address", response.ResponseBody[0].location);
  set(refurnishresponse, "serviceType", serviceType);
  set(refurnishresponse, "treeCount", response.ResponseBody[0].tree_count);
  set(refurnishresponse, "service_request_id", response.ResponseBody[0].service_request_id);
  set(refurnishresponse, "media", JSON.parse(response.ResponseBody[0].service_request_document));
  
  set(refurnishresponse, "isEditState", 1);
  return refurnishresponse;
};

export const setApplicationNumberBox = (state, dispatch) => {

  let applicationNumber = get(state, "state.screenConfiguration.preparedFinalObject.SERVICEREQUEST.service_request_id", null);

  if (applicationNumber) {
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.service_request_id",
        "visible",
        true
      )
    );
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.service_request_id",
        "props.number",
        applicationNumber
      )
    );
  }
};

export const findItemInArrayOfObject = (arr, conditionCheckerFn) => {
  for (let i = 0; i < arr.length; i++) {
    if (conditionCheckerFn(arr[i])) {
      return arr[i];
    }
  }
};

export const getOPMSCards = async () => {
  
  let queryObject = [];
  var requestBody = {

  }

  try {
    const payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_get?moduleName=egpm&masterName=ApplicationType&tenantId="`${getTenantId()}`,
      "",
      queryObject,
      requestBody
    );
    return payload;
  } catch (error) {
    store.dispatch(toggleSnackbar(true, error.message, "error"));
  }




};


export const EditServiceRequest = async (state, dispatch, status) => {
    let response = '';
    
    let method = "CREATE";
  
    try {
      
      let payload = get(state.screenConfiguration.preparedFinalObject, "SERVICEREQUEST", []);
      console.log("payload",payload)
      let service_request_id_for_edit
      try{
        service_request_id_for_edit = payload.service_request_id
      }
      catch(e){
        service_request_id_for_edit= "";
      }
      let response = '';
      setapplicationMode(status);
      let arraypayload=[]
      arraypayload.push(payload);
  
      if (method === "CREATE") {
  
        response = await httpRequest("post", "hc-services/serviceRequest/_create", "", [], {services: arraypayload });
 
        if (response.ResponseInfo.status === 'successful') {
          dispatch(prepareFinalObject("SERVICES", response));
          setapplicationNumber(service_request_id_for_edit);

          setApplicationNumberBox(state, dispatch);
          return { status: "successful", message: response };
        } else {
          return { status: "fail", message: response };
        }
      } 
  
    } catch (error) {
      dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));

    }
  };
export const createServiceRequest = async (state, dispatch, status) => {
  let response = '';
  
  let method = "CREATE";

  try {
    
    let payload = get(state.screenConfiguration.preparedFinalObject, "SERVICEREQUEST", []);
    console.log("payload",payload)

    let response = '';
    setapplicationMode(status);
    let arraypayload=[]
    arraypayload.push(payload);

    if (method === "CREATE") {

      response = await httpRequest("post", "hc-services/serviceRequest/_create", "", [], {services: arraypayload });
      
      
      if (response.services[0].serviceRequestId !== 'null' || response.services[0].serviceRequestId !== '') {
        dispatch(prepareFinalObject("SERVICES", response));
      
        setapplicationNumber(response.services[0].service_request_id);
        
      
        
        setApplicationNumberBox(state, dispatch);
        return { status: "success", message: response };
      } else {
        return { status: "fail", message: response };
      }
    } 

  } catch (error) {
    dispatch(toggleSnackbar(true, { labelName: error.message }, "error"));

    
    
    return { status: "failure", message: error };
  }
};
