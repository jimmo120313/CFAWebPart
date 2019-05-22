import * as React from "react";
import styles from "./SpQuickEditList.module.scss";
import { ISpQuickEditListProps } from "./ISpQuickEditListProps";
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

export class SpQuickEditList extends React.Component<
  ISpQuickEditListProps,
  {}
> {
  private abrService: ABRService;

  public render(): React.ReactElement<ISpQuickEditListProps> {
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
