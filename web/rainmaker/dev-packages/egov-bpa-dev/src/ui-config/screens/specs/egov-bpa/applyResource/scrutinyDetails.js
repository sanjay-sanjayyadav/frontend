import {
  getCommonCard,
  getCommonTitle,
  getTextField,
  getDateField,
  getSelectField,
  getCommonContainer,
  getPattern,
  getCheckBoxwithLabel,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabelWithValue,
  getBreak
} from "egov-ui-framework/ui-config/screens/specs/utils";
// import { getTodaysDateInYMD } from "../utils";

export const buildingPlanScrutinyDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Building Plan Scrutiny Application Details",
      labelKey: "Building Plan Scrutiny Application Details"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  buildingPlanScrutinyDetailsContainer: getCommonContainer({

    buildingplanscrutinyapplicationnumber: getLabelWithValue(
      {
        labelName: "Building permit application Number",
        labelKey: "Building permit application Number"
      },
      {
        jsonPath: "BPAs[0].BPADetails.scrutinyDetails.edcrNumber",
        required: true
      }
    ),

    uploadedfile: getLabelWithValue(
      {
        labelName: "Uploaded Diagram",
        labelKey: "Uploaded Diagram"
      },
      {
        jsonPath: "BPAs[0].BPADetails.scrutinyDetails.dxfFile",
        required: true
      },
    ),

    scrutinyreport: getLabelWithValue(
      {
        labelName: "Scrutiny Report",
        labelKey: "Scrutiny Report"
      },
      {
        jsonPath: "BPAs[0].BPADetails.scrutinyDetails.updatedDxfFile",
        required: true
      },
    ),


    // buildingplanscrutinyapplicationnumber: {
    //   ...getTextField({
    //     label: {
    //       labelName: "Building permit application Number",
    //       labelKey: "Building permit application Number"
    //     },
    //     placeholder: {
    //       labelName: "Building permit application Number",
    //       labelKey: "Building permit application Number"
    //     },
    //     required: true,
    //     jsonPath: "BPAs[0].BPADetails.planscrutinydetails.appnum"
    //   })
    // },
    // uploadedfile: {
    //   ...getTextField({
    //     label: {
    //       labelName: "Uploaded Diagram",
    //       labelKey: "Uploaded Diagram"
    //     },
    //     placeholder: {
    //       labelName: "Uploaded Diagram",
    //       labelKey: "Uploaded Diagram"
    //     },
    //     required: true,
    //     // pattern: getPattern("Name") || null,
    //     jsonPath: "BPAs[0].BPADetails.planscrutinydetails.diagram"
    //   })
    // },
    // scrutinyreport: {
    //   ...getTextField({
    //     label: {
    //       labelName: "Scrutiny Report",
    //       labelKey: "Scrutiny Report"
    //     },
    //     placeholder: {
    //       labelName: "Scrutiny Report",
    //       labelKey: "Scrutiny Report"
    //     },
    //     required: true,
    //     // pattern: getPattern("Name") || null,
    //     jsonPath: "BPAs[0].BPADetails.planscrutinydetails.report"
    //   })
    // }
  })
});

export const blockWiseOccupancyAndUsageDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Block wise occupancy /sub occupancy and usage details",
      labelKey: "Block wise occupancy /sub occupancy and usage details"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  blockWiseOccupancyAndUsageDetailscontainer: getCommonGrayCard({
    header: getCommonSubHeader(
      {
        labelName: "Block 1",
        labelKey: "Block 1"
      },
      {
        style: {
          marginBottom: 18
        }
      }
    ),
    blockWiseContainer: getCommonContainer({
      residential: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-bpa",
        componentPath: "AutosuggestContainer",
        jsonPath: "Employee[0].user.roles",
        required: true,
        props: {
          style: {
            width: "100%",
            cursor: "pointer"
          },
          label: { labelName: "Residential", labelKey: "Residential" },
          placeholder: {
            labelName: "Select Occupancy",
            labelKey: "Occupancy"
          },
          jsonPath: "BPAs[0].BPADetails.blockwiseusagedetails.residential",
          // sourceJsonPath: "createScreenMdmsData.furnishedRolesList",
          labelsFromLocalisation: false,
          suggestions: [],
          fullwidth: true,
          required: true,
          inputLabelProps: {
            shrink: true
          },
          isMulti: true,
          labelName: "name",
          valueName: "code",
          data: [
            {
              code: "Ground Floor",
              name: "Ground Floor"
            },
            {
              code: "First Floor",
              name: "First Floor"
            },
            {
              code: "Second Floor",
              name: "Second Floor"
            }
          ]
        },
        gridDefination: {
          xs: 12,
          sm: 6
        }
      }
    })
  })
});

export const demolitiondetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Demolition Details",
      labelKey: "Demolition Details"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  demolitionDetailsContainer: getCommonContainer({
    demolitionArea: {
      ...getTextField({
        label: {
          labelName: "Demolition Area",
          labelKey: "Demolition Area"
        },
        jsonPath: "BPAs[0].BPADetails.scrutinyDetails.planDetail.planInformation.demolitionArea",
        props: {
          disabled: 'true'
        }
      })
    }
  })
});

export const proposedBuildingDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Proposed Building Details",
      labelKey: "Proposed Building Details"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  proposedContainer: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    visible: true,
    children: {
      breakPending: getBreak(),
      proposedBuildingDetailsContainer: {
        uiFramework: "custom-molecules-local",
        moduleName: "egov-bpa",
        componentPath: "Table",
        props: {
          data: [
            {
              "Floor Description": "Ground Floor",
              "Level": 0,
              "Occupancy/Sub Occupancy": "Individual residential",
              "Buildup Area": 52.22,
              "Floor Area": 51,
              "Carpet Area": 49
            },
            {
              "Floor Description": "First Floor",
              "Level": 0,
              "Occupancy/Sub Occupancy": "Individual residential",
              "Buildup Area": 52.22,
              "Floor Area": 51,
              "Carpet Area": 49
            }
          ],
          columns: {
            "Floor Description": {},
            "Level": {},
            "Occupancy/Sub Occupancy": {},
            "Buildup Area": {},
            "Floor Area": {},
            "Carpet Area": {}
          },
          title: "Builtup and Carpet Area Details",
          options: {
            filterType: "dropdown",
            responsive: "stacked",
            selectableRows: false,
            pagination: false,
            selectableRowsHeader: false,
            sortFilterList: false,
            sort: false,
            filter: false,
            search: false,
            print: false,
            download: false,
            viewColumns: false
          }
        }
      },
      breakP: getBreak(),
      breakq: getBreak(),
      totalBuildUpAreaDetailsContainer: getCommonContainer({
        totalBuildupArea: {
          ...getTextField({
            label: {
              labelName: "Total Buildup Area (sq.mtrs)",
              labelKey: "Total Buildup Area (sq.mtrs)"
            },
            placeholder: {
              labelName: "Total Buildup Area (sq.mtrs)",
              labelKey: "Total Buildup Area (sq.mtrs)"
            },
            required: true,
            jsonPath:
              "BPAs[0].BPADetails.scrutinyDetails.planDetail.blocks[0].building.totalBuitUpArea",
            props: {
              disabled: 'true'
            }
          })
        },
        numOfFloors: {
          ...getTextField({
            label: {
              labelName: "Number Of Floors",
              labelKey: "Number Of Floors"
            },
            placeholder: {
              labelName: "Number Of Floors",
              labelKey: "Number Of Floors"
            },
            required: true,
            jsonPath: "BPAs[0].BPADetails.scrutinyDetails.planDetail.blocks[0].building.totalFloors",
            props: {
              disabled: 'true'
            }
          })
        },
        highFromGroundLevel: {
          ...getTextField({
            label: {
              labelName: "High From Ground Level From Mumty (In Mtrs)",
              labelKey: "High From Ground Level From Mumty (In Mtrs)"
            },
            placeholder: {
              labelName: "High From Ground Level From Mumty (In Mtrs)",
              labelKey: "High From Ground Level From Mumty (In Mtrs)"
            },
            required: true,
            jsonPath:
              "BPAs[0].BPADetails.scrutinyDetails.planDetail.distancesFromMonument",
            props: {
              disabled: 'true'
            }
          })
        }
      })
    }
  }
});