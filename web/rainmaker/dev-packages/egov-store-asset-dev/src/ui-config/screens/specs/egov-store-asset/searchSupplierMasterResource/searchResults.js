import {
  getLocaleLabels,
  getTransformedLocalStorgaeLabels,
} from "egov-ui-framework/ui-utils/commons";
import { getTenantId } from "egov-ui-kit/utils/localStorageUtils";

export const getTextToLocalMapping = (label) => {
  const localisationLabels = getTransformedLocalStorgaeLabels();
  switch (label) {
    case "Supplier Name":
      return getLocaleLabels(
        "Supplier Name",
        "STORE_COMMON_TABLE_COL_SUPPLIER_MASTER_NAME",
        localisationLabels
      );
    case "Supplier Type":
      return getLocaleLabels(
        "Supplier Type",
        "STORE_COMMON_TABLE_COL_SUPPLIER_MASTER_TYPE",
        localisationLabels
      );
    case "Active":
      return getLocaleLabels(
        "Active",
        "STORE_COMMON_TABLE_COL_SUPPLIER_MASTER_ACTIVE",
        localisationLabels
      );
    case "Search Results for Supplier Details":
      return getLocaleLabels(
        "Search Results for Supplier Details",
        "STORE_SUPPLIER_MASTER_SEARCH_RESULTS_TABLE_HEADING",
        localisationLabels
      );
  }
};

export const searchResults = {
  uiFramework: "custom-molecules",
  componentPath: "Table",
  visible: false,
  props: {
    columns: [
      getTextToLocalMapping("Supplier Name"),
      getTextToLocalMapping("Supplier Type"),
      getTextToLocalMapping("Active"),
    ],
    title: getTextToLocalMapping("Search Results for Supplier Details"),
    options: {
      filter: false,
      download: false,
      responsive: "stacked",
      selectableRows: false,
      hover: true,
      rowsPerPageOptions: [10, 15, 20],
      onRowClick: (row, index) => {
        onRowClick(row);
      },
    },
  },
};

const onRowClick = (rowData) => {
  window.location.href = `view-supplier-master?name=${rowData[0]}&tenantId=${getTenantId()}`;
};

