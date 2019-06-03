import * as React from "react";
require("./ActionPlanMasterList.module.scss");
import {
  IActionPlanMasterListProps,
  IActionPlanMasterListState
} from "./index";
import ReactDataGrid from "react-data-grid";
import { IActionPlan, IActionPlanItem } from "../../../../models/index";
import { ABRService } from "../../../../services/index";
import { registerBeforeUnloadHandler } from "@microsoft/teams-js";


export class ReportUrlFormatter extends React.Component<any, any>{
  render() {
    return (<div><a href={this.props.dependentValues.actionPlanReportURL}>Action Plan Report</a></div>);
  }
}
export class ABRUrlFormatter extends React.Component<any, any>{
  render() {
    return (<div><a href={this.props.dependentValues.reviewDetail}>Action Plan Report</a></div>);
  }
}


const columns = [
  { key: "brigadeName", name: "Brigade" },
  { key: "reviewPeriod", name: "Review Year" },
  { key: "dateStarted", name: "Date Started" },
  { key: "completedBy", name: "Action Plan Completed By" },
  { key: "districtName", name: "District" },
  { key: "regionName", name: "Region" },
  { key: "reviewDetail", name: "Review Detail", getRowMetaData: (row) => row, formatter: ABRUrlFormatter },
  { key: "actionPlanReportURL", name: "Action Plan Report", width: 150, getRowMetaData: (row) => row, formatter: ReportUrlFormatter },
  { key: "reviewId", name: "Review ID" },
  { key: "classification", name: "Classification" }
];

let actionPlanDetail: IActionPlan[]
let actionPlanItemDetail: IActionPlanItem[]
const actionPlanColumns = () => {

}

export class ActionPlanMasterList extends React.Component<

  IActionPlanMasterListProps,
  IActionPlanMasterListState
  > {
  private actionPlanService = new ABRService();



  constructor(props: IActionPlanMasterListProps) {
    super(props);
    this.state = {
      rows: {}
    };


  }
  public async componentDidMount(): Promise<void> {
    //this.brigade._getBrigadeDetail();
    actionPlanDetail = await this.actionPlanService._getActionPlanMaster(
      this.props.reviewPeriod,
      this.props.selectedBrigade
    );

    await this.actionPlanService._getActionPlanItem(this.props.reviewPeriod,
      this.props.selectedBrigade
    );
    this.setState({ rows: actionPlanDetail })


  }

  _actionPlanReportURLActions = [
    {
      actions: [
        {
          text: "Option 1",
          callback: () => {
            alert("Option 1 clicked");
          }
        }
      ]
    }

  ];
  public render(): React.ReactElement<IActionPlanMasterListProps> {
    return (
      <ReactDataGrid
        columns={columns}
        rowGetter={i => this.state.rows[i]}
        rowsCount={3}
        minHeight={150}

      />
    );
  }
}
