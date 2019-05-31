import * as React from "react";
require("./ActionPlanMasterList.module.scss");
import {
  IActionPlanMasterListProps,
  IActionPlanMasterListState
} from "./index";
import ReactDataGrid from "react-data-grid";
import { IActionPlan } from "../../../../models/index";
import { ABRService } from "../../../../services/index";


const columns = [
  { key: "brigadeName", name: "Brigade" },
  { key: "reviewPeriod", name: "Review Year" },
  { key: "dateStarted", name: "Date Started" },
  { key: "completedBy", name: "Action Plan Completed By" },
  { key: "districtName", name: "District" },
  { key: "regionName", name: "Region" },
  { key: "reviewDetail", name: "Review Detail" },
  { key: "actionPlanReportURL", name: "Action Plan Report" },
  { key: "reviewId", name: "Review ID" }
];

let actionPlanDetail: IActionPlan[]

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
    this.setState({ rows: actionPlanDetail })


  }

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
