import {
  getCommonCard,
  getCommonContainer,
  getCommonTitle,
  getDateField,
  getPattern,
  getTextField,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";



export const tenderMasterCreate = getCommonCard({
  subHeader: getCommonTitle({
    labelName: "Tender Notice Details",
    labelKey: "PR_TENDER_NOTICE_DETAILS"
  }),

  appStatusAndToFromDateContainer: getCommonContainer({

    date: getDateField({
      label: {
        labelName: "Date",
        labelKey: "PR_TENDER_DETAILS_DATE"
      },
      placeholder: {
        labelName: "DD/MM/YYYY",
        labelKey: "PR_TENDER_DETAILS_DATE_PLACEHOLDER"
      },
      required: true,
      pattern: getPattern("Date"),
      errorMessage: "Invalid Date",
      jsonPath: "tenderNotice.tenderDate",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      },
      props: {
        className: "applicant-details-error"
      }
    }),
    fileNumber: {
      ...getTextField({
        label: {
          labelName: "File Number",
          labelKey: "PR_TENDER_DETAILS_FILE_NUMBER"
        },
        placeholder: {
          labelName: "File Number",
          labelKey: "PR_TENDER_DETAILS_FILE_NUMBER_PLACEHOLDER"
        },
        pattern:getPattern("fileNumber"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        required: true,
        jsonPath: "tenderNotice.fileNumber"
      })
    }
  })
});

export const tenderMSWordTemplate = getCommonCard({

  appStatusAndToFromDateContainer: getCommonContainer({
    subject: {
      ...getTextField({
        label: {
          labelName: "Subject",
          labelKey: "PR_TENDER_DETAILS_SUBJECT"
        },
        placeholder: {
          labelName: "Subject",
          labelKey: "PR_TENDER_DETAILS_SUBJECT_PLACEHOLDER"
        },
        pattern: getPattern("TextValidation"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        required: true,
        jsonPath: "tenderNotice.tenderSubject",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 12
        }
      })
    },


    TenderDetails: {
      
    },
    subHeader: getCommonTitle({
      labelName: "Note",
      labelKey: "PR_TENDER_NOTICE_NOTE"
    }),

    
}),	


break: getBreak(),
subHeader: getCommonTitle({
  labelName: "Note",
  labelKey: "PR_TENDER_DETAILS"
}),
	break: getBreak(),
    EmailContent: {
      uiFramework: "custom-molecules-local",
      moduleName: "egov-pr",
      componentPath: "RichTextEditor",
      props: {
		label : "tendernote",
	  }
    },
   
  
});

export const tenderBillingDetail = getCommonCard({

  appStatusAndToFromDateContainer: getCommonContainer({
    subHeader: getCommonTitle({
      labelName: "Billing Amount",
      labelKey: "TENDER_BILLING_AMOUNT"
    }),
    billAmount: {
      ...getTextField({
        label: {
          labelName: "Bill Amount",
          labelKey: "TENDER_BILL_AMOUNT"
        },
        placeholder: {
          labelName: "Bill Amount",
          labelKey: "TENDER_BILL_AMOUNT_PLACEHOLDER"
        },
        //pattern: getPattern("VillageName"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        required: true,
        jsonPath: "tenderNotice.billAmount",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 12
        }
      })
    }
  })
});
