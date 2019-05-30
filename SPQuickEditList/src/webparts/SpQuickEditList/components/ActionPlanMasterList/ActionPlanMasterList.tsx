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
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
  { key: "count", name: "Count" }
];

const rows = [
  { id: 0, title: "row1", count: 20 },
  { id: 1, title: "row1", count: 40 },
  { id: 2, title: "row1", count: 60 }
];

export class ActionPlanMasterList extends React.Component<
  IActionPlanMasterListProps,
  IActionPlanMasterListState
> {
  private actionPlanService = new ABRService();

  public async componentDidMount(): Promise<void> {
    //this.brigade._getBrigadeDetail();
    this.actionPlanService._getActionPlanMaster(
      this.props.reviewPeriod,
      this.props.selectedBrigade
    );
    // .then((option: ISolutionDropdownOption[]) => {
    //   this.setState({ reviewPeriodOption: option });
    // });
  }

  public render(): React.ReactElement<IActionPlanMasterListProps> {
    return (
      <ReactDataGrid
        columns={columns}
        rowGetter={i => rows[i]}
        rowsCount={3}
        minHeight={150}
      />
    );
  }
}
