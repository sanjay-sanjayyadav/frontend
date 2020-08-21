import {
    getLabel,
  } from "egov-ui-framework/ui-config/screens/specs/utils";
  import {
    getButtonVisibility,
    getCommonApplyFooter,
    downloadAcknowledgementForm,downloadAcknowledgementFormForMortagage
  } from "../../utils";
  import { setRoute } from "egov-ui-framework/ui-redux/app/actions";
  import "./index.css";
  import set from 'lodash/set'

  export const footerReview = (
    action,
    state,
    dispatch,
    status,
    applicationNumber,
    tenantId,
    businessService
  ) => {
    /** MenuButton data based on status */

    return getCommonApplyFooter({
      container: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
        children: {
          rightdiv: {
            uiFramework: "custom-atoms",
            componentPath: "Div",
            props: {
              style: {
              float:"right",
              display:"flex"
              }
            },
            children: {
              makePayment: {
                componentPath: "Button",
                props: {
                  variant: "contained",
                  color: "primary",
                  style: {
                    minWidth: "180px",
                    height: "48px",
                    marginRight: "45px",
                    borderRadius: "inherit"
                  }
                },
                children: {
                  submitButtonLabel: getLabel({
                    labelName: "MAKE PAYMENT",
                    labelKey: "COMMON_MAKE_PAYMENT"
                  })
                },
                onClickDefination: {
                  action: "condition",
                  callBack: () => {
                    dispatch(
                      setRoute(
                       `/rented-properties-citizen/pay?consumerCode=${applicationNumber}&tenantId=${tenantId}&businessService=${businessService}`
                      )
                    );
                  },
  
                },
                visible: process.env.REACT_APP_NAME === "Citizen" && getButtonVisibility(status, "PENDINGPAYMENT") ? true : false
              }
            },
            gridDefination: {
              xs: 12,
              sm: 12
            }
          },     
        }
      }
    });
  };







  export const footerReviewTop = (
    action,
    state,
    dispatch,
    status,
    applicationNumber,
    tenantId,
    financialYear
  ) => {
    
  
    return {
      rightdiv: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          style: { textAlign: "right", display: "flex" }
        },
        children: {
          downloadMenu: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-tradelicence",
            componentPath: "MenuButton",
            props: {
              data: {
                label: {labelName : "DOWNLOAD" , labelKey :"TL_DOWNLOAD"},
                 leftIcon: "cloud_download",
                rightIcon: "arrow_drop_down",
                props: { variant: "outlined", style: { height: "60px", color : "#FE7A51",marginLeft:"10px" }, className: "tl-download-button" },
                //menu: downloadMenu
              }
            }
          },
          printMenu: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-tradelicence",
            componentPath: "MenuButton",
            props: {
              data: {
                label: {labelName : "PRINT" , labelKey :"TL_PRINT"},
                leftIcon: "print",
                rightIcon: "arrow_drop_down",
                props: { variant: "outlined", style: { height: "60px", color : "#FE7A51",marginLeft:"5px" }, className: "tl-print-button" },
                //menu: printMenu
              }
            }
          }
  
        },
        // gridDefination: {
        //   xs: 12,
        //   sm: 6
        // }
      } 
    }
    
  };
  


  export const downloadPrintContainer = (
    action,
    state,
    dispatch,
    status,
    applicationNumber,
    tenantId
  ) => {
    
  
    return {
      rightdiv: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          style: { textAlign: "right", display: "flex" }
        },
        children: {
          downloadMenu: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-tradelicence",
            componentPath: "MenuButton",
            props: {
              data: {
                label: {labelName : "DOWNLOAD" , labelKey :"TL_DOWNLOAD"},
                 leftIcon: "cloud_download",
                rightIcon: "arrow_drop_down",
                props: { variant: "outlined", style: { height: "60px", color : "#FE7A51" }, className: "tl-download-button" },
               // menu: downloadMenu
              }
            }
          },
          printMenu: {
            uiFramework: "custom-atoms-local",
            moduleName: "egov-tradelicence",
            componentPath: "MenuButton",
            props: {
              data: {
                label: {labelName : "PRINT" , labelKey :"TL_PRINT"},
                leftIcon: "print",
                rightIcon: "arrow_drop_down",
                props: { variant: "outlined", style: { height: "60px", color : "#FE7A51" }, className: "tl-print-button" },
                //menu: printMenu
              }
            }
          }
  
        },
        // gridDefination: {
        //   xs: 12,
        //   sm: 6
        // }
      }
    }
  };


 