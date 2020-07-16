import {
    getCommonHeader,
    getCommonContainer,
    getCommonCard
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg, setDocuments } from "egov-ui-framework/ui-utils/commons";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import { getDuplicateCopySearchResults} from "../../../../ui-utils/commons";
import { getDuplicateCopyReviewPropertyAddressDetails , getDuplicateCopyPreviewApplicantDetails} from "./applyResource/review-applications";
import { getReviewDocuments } from "./applyResource/review-documents";

const headerrow = getCommonContainer({
    header: getCommonHeader({
      labelName: "Duplicate Copy Application",
      labelKey: "DUPLICATE_COPY_APPLICATION_HEADER"
    })
  });

const reviewApplicantDetails = getDuplicateCopyPreviewApplicantDetails(false);
const reviewPropertyAddressDetails = getDuplicateCopyReviewPropertyAddressDetails(false)
const reviewFreshLicenceDocuments = getReviewDocuments(false, "duplicate-copy", "DuplicateCopyTemp[0].reviewDocData")

const transferReviewDetails = getCommonCard({
    reviewPropertyAddressDetails,
    reviewApplicantDetails,
    reviewFreshLicenceDocuments
})

  const beforeInitFn = async(action, state, dispatch) => {
    const applicationNumber = getQueryArg(window.location.href, "applicationNumber");
      if(!!applicationNumber) {
        const queryObject = [
          {key: "applicationNumber", value: applicationNumber}
        ]
        const response = await getDuplicateCopySearchResults(queryObject);
        if (response && response.DuplicateCopyApplications) {
        let {DuplicateCopyApplications} = response
        let applicationDocuments = DuplicateCopyApplications[0].applicationDocuments|| [];
        const removedDocs = applicationDocuments.filter(item => !item.active)
        applicationDocuments = applicationDocuments.filter(item => !!item.active)
        DuplicateCopyApplications = [{...DuplicateCopyApplications[0], applicationDocuments}]

        dispatch(prepareFinalObject("DuplicateCopyApplications", DuplicateCopyApplications))
        dispatch(
          prepareFinalObject(
            "DuplicateCopyTemp[0].removedDocs",
            removedDocs
          )
        );
        await setDocuments(
          response,
          "DuplicateCopyApplications[0].applicationDocuments",
          "DuplicateCopyTemp[0].reviewDocData",
          dispatch,'RP'
        );
        }
      }
    }
  
const duplicateCopySearchPreview = {
    uiFramework: "material-ui",
    name: "search-duplicate-copy-preview",
    beforeInitScreen: (action, state, dispatch) => {
        beforeInitFn(action, state, dispatch)
        return action
    },
    components: {
        div: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            props: {
              className: "common-div-css search-preview"
            },
            children: {
              headerDiv: {
                uiFramework: "custom-atoms",
                componentPath: "Container",
                children: {
                  header1: {
                    gridDefination: {
                      xs: 12,
                      sm: 8
                    },
                   ...headerrow
                  },
                  helpSection: {
                    uiFramework: "custom-atoms",
                    componentPath: "Container",
                    props: {
                      color: "primary",
                      style: { justifyContent: "flex-end" }
                    },
                    gridDefination: {
                      xs: 12,
                      sm: 4,
                      align: "right"
                    }
                  }
                  }
                },
                taskStatus: {
                  uiFramework: "custom-containers-local",
                  moduleName: "egov-rented-properties",
                  componentPath: "WorkFlowContainer",
                  props: {
                    dataPath: "DuplicateCopyApplications",
                    moduleName: "DuplicateCopyOfAllotmentLetterRP",
                    updateUrl: "/csp/duplicatecopy/_update"
                  }
                },
              transferReviewDetails
            }
          }
    }
}

export default duplicateCopySearchPreview