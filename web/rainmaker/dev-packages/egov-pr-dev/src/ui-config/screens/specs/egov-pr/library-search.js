import {
  getCommonHeader,
  getLabel,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";

import { showHideAdhocPopup, resetFields, getRequiredDocData } from "../utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { pendingApprovals } from "./searchResource/pendingApprovals";
import { searchResultsLibrary } from "./searchResource/searchResults";
import { setBusinessServiceDataToLocalStorage } from "egov-ui-framework/ui-utils/commons";
import {
  getTenantId,
  localStorageGet
} from "egov-ui-kit/utils/localStorageUtils";
import find from "lodash/find";
import set from "lodash/set";
import get from "lodash/get";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getRequiredDocuments } from "./requiredDocuments/reqDocs";
import { getlibraryGridData } from "./searchResource/citizenSearchFunctions";
import { LibraryFilter } from "./gridFilter/Filter";
import { httpRequest } from "../../../../ui-utils";

const hasButton = getQueryArg(window.location.href, "hasButton");
let enableButton = true;
enableButton = hasButton && hasButton === "false" ? false : true;

const header = getCommonHeader({
  labelName: "PR LIBRARY LIST",
  labelKey: "PR_LIBRARY_LIST"
});

const pageResetAndChange = (state, dispatch) => {
  dispatch(
    prepareFinalObject("PublicRelations", [{ "PublicRelationDetails.PublicRelationType": "NEW" }])
  );
  
};
const getMdmsData = async (action, state, dispatch) => {
  debugger
  let tenantId =
    get(
      state.screenConfiguration.preparedFinalObject,
      "PublicRelations[0].PublicRelationDetails.propertyDetails.address.city"
    ) || getTenantId();

    //let tenantId =    
  let mdmsBody = {
    MdmsCriteria: {
      tenantId: tenantId,
      moduleDetails: [
        {
          moduleName: "RAINMAKER-PR",
          masterDetails: [{ name: "eventStatus" }, { name: "eventScheduledStatus" }]
        },
       
        {
          moduleName: "tenant",
          masterDetails: [
            {
              name: "tenants"
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
const LibrarySearchAndResult = {
  uiFramework: "material-ui",
  name: "library-search",
  beforeInitScreen: (action, state, dispatch) => {
    dispatch(prepareFinalObject("PublicRealation[0].filterEvent", {}));
    dispatch(prepareFinalObject("PublicRealation[0].filterInviteEvent", {}));
    dispatch(prepareFinalObject("PublicRealation[0].filterpress", {}));
    dispatch(prepareFinalObject("PublicRealation[0].filtertender", {}));
    dispatch(prepareFinalObject("PublicRealation[0].filterpressMaster", {}));
    dispatch(prepareFinalObject("TimeseriesReport", {}));
    dispatch(prepareFinalObject("LocalityReport", {}));
    dispatch(prepareFinalObject("eventReport", {}));

    //PublicRealation[0].filterEvent
    //PublicRealation[0].filterInviteEvent
    //PublicRealation[0].filterLibraryEvent
    //PublicRealation[0].filterpress
    //PublicRealation[0].filtertender
    //PublicRealation[0].filterpressMaster
    getlibraryGridData(action, state, dispatch);
    getMdmsData(action, state, dispatch)
    

    const tenantId = getTenantId();
    
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "library-search"
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
        LibraryFilter,
          breakAfterSearch: getBreak(),
        // progressStatus,
        searchResultsLibrary
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pr",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: false,
        screenKey: "library-search"
      },
      children: {
        popup: {}
      }
    }
  }
};

export default LibrarySearchAndResult;