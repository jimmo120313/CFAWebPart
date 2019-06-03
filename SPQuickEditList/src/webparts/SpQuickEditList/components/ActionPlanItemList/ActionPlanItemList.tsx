import * as React from "react";
require("./ActionPlanItemList.module.scss");
import { IActionPlanItemListProp, IActionPlanItemListState } from "./index";
import ReactDataGrid from "react-data-grid";
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

export class ActionPlanItemList extends React.Component<
  IActionPlanItemListProp,
  IActionPlanItemListState
> {
  private actionPlanService: ABRService;

  constructor(props: IActionPlanItemListProp) {
    super(props);
    this.state = {
      rows: {},
      selectedBrigade: this.props.selectedBrigade,
      reviewPeriod: props.reviewPeriod
    };
  }

  public async componentDidMount(): Promise<void> {
    //   let actionPlanListItem = await this.actionPlanService._getActionPlanListItem(
    //     this.props.reviewPeriod,
    //     this.props.selectedBrigade
    //   );
    //   this.setState({ rows: actionPlanListItem });
  }
  public render(): React.ReactElement<IActionPlanItemListProp> {
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
