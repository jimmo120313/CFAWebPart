import * as React from "react";
require("./ActionPlanMasterList.module.scss");
import {
  IActionPlanMasterListProps,
  IActionPlanMasterListState
} from "./index";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data, Filters } from "react-data-grid-addons";
import { IActionPlan } from "../../../../models/index";
import { ABRService } from "../../../../services/index";
import { registerBeforeUnloadHandler } from "@microsoft/teams-js";

const AutoCompleteFilterFilters = Filters;
const selectors = Data.Selectors;

export class ReportUrlFormatter extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <a href={this.props.dependentValues.actionPlanReportURL}>
          Action Plan Report
        </a>
      </div>
    );
  }
}
export class ABRUrlFormatter extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <a href={this.props.dependentValues.reviewDetail}>Action Plan Report</a>
      </div>
    );
  }
}

const columns = [
  {
    key: "brigadeName",
    name: "Brigade",
    filterRenderer: AutoCompleteFilterFilters,
    filterable: true
  },
  { key: "reviewPeriod", name: "Review Year" },
  { key: "dateStarted", name: "Date Started" },
  { key: "completedBy", name: "Action Plan Completed By" },
  { key: "districtName", name: "District" },
  { key: "regionName", name: "Region" },
  { key: "classification", name: "Classification" },
  {
    key: "reviewDetail",
    name: "Review Detail",
    getRowMetaData: row => row,
    formatter: ABRUrlFormatter
  },
  {
    key: "actionPlanReportURL",
    name: "Action Plan Report",
    width: 150,
    getRowMetaData: row => row,
    formatter: ReportUrlFormatter
  },
  { key: "reviewId", name: "Review ID" }
];

let actionPlanDetail: IActionPlan[];
const actionPlanColumns = () => {};

export class ActionPlanMasterList extends React.Component<
  IActionPlanMasterListProps,
  IActionPlanMasterListState
> {
  private actionPlanService = new ABRService();

  constructor(props: IActionPlanMasterListProps) {
    super(props);
    this.state = {
      rows: {},
      filters: {}
    };
  }
  public async componentDidMount(): Promise<void> {
    //this.brigade._getBrigadeDetail();
    actionPlanDetail = await this.actionPlanService._getActionPlanMaster(
      this.props.reviewPeriod,
      this.props.selectedBrigade
    );
    this.setState({ rows: actionPlanDetail });
  }

  public handleFilterChange(filters) {
    const newFilters = { ...filters };
    filters.forEach(filter => {
      if (filter.filterTerm) {
        newFilters[filter.column.key] = filter;
      } else {
        delete newFilters[filter.column.key];
      }
    });
    return newFilters;
  }

  // private getValidFilterValues(rows, columnId): any {
  //   return rows
  //     .map(r => r[columnId])
  //     .filter((item, i, a) => {
  //       return i === a.indexOf(item);
  //     });
  // }

  private getRows(rows, filters): any {
    return selectors.getRows({ rows, filters });
  }

  public render(): React.ReactElement<IActionPlanMasterListProps> {
    const filteredRows = this.getRows(this.state.rows, this.state.filters);
    return (
      <ReactDataGrid
        columns={columns}
        rowGetter={i => filteredRows[i]}
        rowsCount={filteredRows.length}
        minHeight={150}
        toolbar={<Toolbar enableFilter={true} />}
        // onAddFilter={filter => this.handleFilterChange(filter)}
        // onClearFilters={() => this.setState({ filters: {} })}
        // getValidFilterValues={columnKey =>
        //   this.getValidFilterValues(this.state.rows, columnKey)
        // }
      />
    );
  }
}
