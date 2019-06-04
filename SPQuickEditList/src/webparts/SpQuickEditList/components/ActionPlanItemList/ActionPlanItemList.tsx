import * as React from "react";
require("./ActionPlanItemList.module.scss");
import { IActionPlanItemListProp, IActionPlanItemListState } from "./index";
import { IActionPlanItem } from "../../../../models/index";
import ReactDataGrid from "react-data-grid";
import { ABRService } from "../../../../services/index";

const columns = [
  { key: "brigadeName", name: "Brigade Name" },
  { key: "endState", name: "End State" },
  { key: "viability", name: "Viability Category" },
  { key: "subCategory", name: "Sub-Category" },
  { key: "rating", name: "Rating" },
  { key: "statementSelection", name: "Statement Selection" },
  { key: "treatment", name: "Treatment", editable: true },
  { key: "initiative", name: "Initiative", editable: true },
  { key: "supportRequired", name: "Support Required", editable: true },
  { key: "priority", name: "Priority", editable: true },
  { key: "due", name: "Due", editable: true },
  { key: "status", name: "Status", editable: true }
];

let actionPlanItem: IActionPlanItem[];

export class ActionPlanItemList extends React.Component<
  IActionPlanItemListProp,
  IActionPlanItemListState
> {
  private actionPlanItemService: ABRService = new ABRService();

  constructor(props: IActionPlanItemListProp) {
    super(props);
    this.state = {
      selectedBrigade: this.props.selectedBrigade,
      rows: {}
    };
  }
  public async componentDidMount(): Promise<void> {
    actionPlanItem = await this.actionPlanItemService._getActionPlanItem(
      "",
      this.state.selectedBrigade
    );

    this.setState({ rows: actionPlanItem });
  }

  public render(): React.ReactElement<IActionPlanItemListProp> {
    if (this.state.rows) {
      return (
        <ReactDataGrid
          columns={columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={3}
          minHeight={150}
        />
      );
    } else {
      return <div>no item show</div>;
    }
  }
}
