import {
  getCommonContainer,
  getCommonHeader,
  getStepperObject
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getCurrentFinancialYear } from "../utils";
import { footer } from "./applyResource/footer";
import { eventDetails } from "./applyResource/eventDetails";
import { eventDescription } from "./applyResource/eventDescription";
import jp from "jsonpath";

import { EventFirstStepperTimeDetail } from "./applyResource/EventFirstStepperTimeDetail";
import { EventFirstStepperDetail } from "./applyResource/EventFirstStepperDetail";

import { documentDetails, MultipleDocumentDetails } from "./applyResource/documentDetails";
import { getQueryArg ,getFileUrlFromAPI} from "egov-ui-framework/ui-utils/commons";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getTenantId, localStorageSet } from "egov-ui-kit/utils/localStorageUtils";
import { httpRequest } from "../../../../ui-utils";
import {
  sampleSearch,
  sampleSingleSearch,
  sampleDocUpload
} from "../../../../ui-utils/sampleResponses";
import set from "lodash/set";
import get from "lodash/get";
import {
  prepareDocumentsUploadData,
  getSearchResults,
  furnishNocResponse,
  setApplicationNumberBox,
  getSearchResultsViewEvent
} from "../../../../ui-utils/commons";
import {setCommittiee} from "../egov-pr/searchResource/citizenSearchFunctions"
import { localStorageGet } from "egov-ui-kit/utils/localStorageUtils";
import commonConfig from '../../../../config/common';
export const stepsData = [
  { labelName: "Event Details", labelKey: "PR_EVENT_DETAILS_HEADER" },
  { labelName: "Documents", labelKey: "PR_COMMON_DOCUMENTS" },
  { labelName: "Summary", labelKey: "PR_EVENT_APPLICANT_SUMMARY_STEP" }
];
export const stepper = getStepperObject(
  { props: { activeStep: 0 } },
  stepsData
);

const applicationNumberContainer = () => {
  const applicationNumber = getQueryArg(
    window.location.href,
    "applicationNumber"
  );
  if (applicationNumber)
    return {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-noc",
      componentPath: "ApplicationNoContainer",
      props: {
        number: `${applicationNumber}`,
        visibility: "hidden"
      },
      visible: true
    };
  else return {};
};

export const header = getCommonContainer({
  header: getCommonHeader({
    labelName: `Create Event`, 
    labelKey: "PR_COMMON_CREATE_EVENT"
  }),
 
});

export const formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    EventFirstStepperDetail,
    EventFirstStepperTimeDetail,
    eventDetails,
    eventDescription
    }
};

export const formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
   MultipleDocumentDetails
  },
  visible: false
};


const getMdmsData = async (action, state, dispatch) => {
 // let tenantId = getTenantId();

  let mdmsBody = {
    MdmsCriteria: {
      tenantId: commonConfig.tenantId,
      moduleDetails: [
        {
          moduleName: "RAINMAKER-PR",
          masterDetails: [{ name: "eventType" }, { name: "eventStatus" },{ name: "eventDocuments" },  { name: "eventSector" },{ name: "localityAreaName" }]
        },
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
            }
          ]
        },


        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
            }
          ]
        },
        {
          moduleName: "common-masters",
          masterDetails: [
            {
              name: "Department"
            }
          ]
        },
      ]
    }
  };
  try {
    let payload = null;
    payload = await httpRequest(
      "post",
      "/egov-mdms-service/v1/_search",
      "_search",
      [],
      mdmsBody
    );
    debugger
    dispatch(prepareFinalObject("applyScreenMdmsData", payload.MdmsRes));
  } catch (e) {
    console.log(e);
  }
};

const getFirstListFromDotSeparated = list => {
  list = list.map(item => {
    if (item.active) {
      return item.code.split(".")[0];
    }
  });
  list = [...new Set(list)].map(item => {
    return { code: item };
  });
  return list;
};


export const prepareEditFlow = async (
  state,
  dispatch,
  applicationNumber,
  tenantId
) => {
  
  let id=getQueryArg(window.location.href, "eventuuId") 
  if(id)
  {
   let payload={
    "requestBody":{
            "tenantId":getTenantId(),
            "eventDetailUuid":getQueryArg(window.location.href, "eventuuId")            ,
            "scheduledStatus":"",
            "eventStatus":"PUBLISHED",
            "moduleCode": localStorageGet("modulecode"),
            
    }
    
          }
   let response = await getSearchResultsViewEvent(payload)
 
 if(response.ResponseBody.length>0)
 {
	
   try {
     let payload1 = null;
     let user=[]
    const queryStr = [
         { key: "departments", value: response.ResponseBody[0].organizerDepartmentName },
       ]
     payload1 = await httpRequest(
       "post",
       "/egov-hrms/employees/_search",
       "_search",
       queryStr,
       {}
     );
     for(let i=0;i<payload1.Employees.length;i++)
     {
       if(payload1.Employees[i].user!==null)
       {
         user.push(payload1.Employees[i].user) 
         
       }
     }
     dispatch(prepareFinalObject("applyScreenMdmsData.employees", user));
    
   } catch (e) {
     console.log(e);
   }

   
	 let documentsPreview = [];
  
      let PublicRelation = response.ResponseBody[0]
    
      let doc=JSON.parse(PublicRelation.eventString)
     // console.log(doc.length)
      if(doc.length>0)
      {
       doc.map(item => {
	  
	 
        documentsPreview.push({
          title: "EVENT_DOCUMENT",
          fileStoreId: item.fileStoreId,
          linkText: "View"
        });
	 });
		console.log("Summary previewwwwwwwwwwww");
		console.log(documentsPreview)
	 
        let fileStoreIds = jp.query(documentsPreview, "$.*.fileStoreId");
        let fileUrls =
          fileStoreIds.length > 0 ? await getFileUrlFromAPI(fileStoreIds) : {};
        documentsPreview = documentsPreview.map(function (doc, index) {
			console.log("doccccccccccccccccc");
			console.log(doc);
      doc["link"] = fileUrls && fileUrls[doc.fileStoreId] && fileUrls[doc.fileStoreId].split(",")[0] || "";
          doc["documentType"] = `Document - ${index + 1}`;

          doc["fileName"] = `Document - ${index + 1}`;
          
          
            return doc;
        });
	
    }
        dispatch(prepareFinalObject("EventDocuments", documentsPreview));
	 
  let Refurbishresponse = furnishNocResponse(response);
  let startdate= response.ResponseBody[0].startDate
  startdate=startdate.split(" ")[0]
 
  dispatch(prepareFinalObject("PublicRealation[0].CreateEventDetails", Refurbishresponse));
  dispatch(
    handleField(
      "apply",
      "components.div.children.formwizardFirstStep.children.EventFirstStepperTimeDetail.children.cardContent.children.propertyDetailsConatiner.children.EndDate",
      "props.inputProps.min",
      startdate
    )
  );
 }
}
}


const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: (action, state, dispatch) => {
    localStorageSet("shoWHideCancel","apply")
    const eventuuId = getQueryArg(
      window.location.href,
      "eventuuId"
    );
    const tenantId = getQueryArg(window.location.href, "tenantId");
    const step = getQueryArg(window.location.href, "step");

    //Set Module Name
    set(state, "screenConfiguration.moduleName", "public-relations");

    // Set MDMS Data
    getMdmsData(action, state, dispatch).then(response => {
		if(eventuuId)
		{
			prepareEditFlow(state, dispatch, eventuuId, tenantId);
		}	
      prepareDocumentsUploadData(state, dispatch, 'create_event');
      
    });

    // Search in case of EDIT flow
    let payload_committie={
      "tenantId": getTenantId(),
      "RequestBody":{
      
      "committeeUuid": "",
      "committeeName": "",
      "committeeDescription": "",
      "isActive": true,
      "tenantId": getTenantId(),
      "moduleCode":localStorageGet("modulecode"),
      "committeeMember": [ ]
      }
      }
      setCommittiee(action, state, dispatch,payload_committie);
    

    // Code to goto a specific step through URL
    if (step && step.match(/^\d+$/)) {
      let intStep = parseInt(step);
      set(
        action.screenConfig,
        "components.div.children.stepper.props.activeStep",
        intStep
      );
      let formWizardNames = [
        "formwizardFirstStep",
        "formwizardSecondStep",
       ];
      for (let i = 0; i <= 1; i++) {
        set(
          action.screenConfig,
          `components.div.children.${formWizardNames[i]}.visible`,
          i == step
        );
        set(
          action.screenConfig,
          `components.div.children.footer.children.previousButton.visible`,
          step != 0
        );
      }
    }

    // Set defaultValues of radiobuttons and selectors
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        },
        stepper,
        formwizardFirstStep,
        formwizardSecondStep,
        footer
      }
    }
  }
};

export default screenConfig;