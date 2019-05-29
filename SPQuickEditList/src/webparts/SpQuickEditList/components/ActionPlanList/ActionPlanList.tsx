import * as React from "react";
require("./SpQuickEditList.module.scss");
import { IActionPlanListProps, IActionPlanListState } from "./index";
import ReactDataGrid from "react-data-grid";
import { IABR } from "../../../../models/index";
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

export class ActionPlanList extends React.Component<
  IActionPlanListProps,
  IActionPlanListState
> {
  private abrService: ABRService;

  public render(): React.ReactElement<IActionPlanListProps> {
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
