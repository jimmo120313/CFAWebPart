import * as React from "react";
import styles from "./SpQuickEditList.module.scss";
import { ISpQuickEditListProps } from "./ISpQuickEditListProps";
import { escape } from "@microsoft/sp-lodash-subset";
import ReactDataGrid from "react-data-grid";

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
