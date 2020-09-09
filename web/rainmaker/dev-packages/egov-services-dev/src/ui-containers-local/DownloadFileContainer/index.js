import React, { Component } from "react";
import { MultiDownloadCard } from "egov-ui-framework/ui-molecules";
import { connect } from "react-redux";
import get from "lodash/get";
import "./index.scss";

class DownloadFileContainer extends Component {
    render() {
        const { data, documentData, ...rest } = this.props;
        return data.length > 0 ? (
            <MultiDownloadCard data={data} {...rest} />
        ) : (
            "No Document Available."
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { screenConfiguration } = state;
    const data = ownProps.data
        ? ownProps.data
        : get(
              screenConfiguration.preparedFinalObject,
              ownProps.sourceJsonPath,
              []
          );
    return { data };
};

export default connect(mapStateToProps, null)(DownloadFileContainer);
