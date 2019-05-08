import * as React from "react";
import styles from "./SpQuickEditList.module.scss";
import { ISpQuickEditListProps } from "./ISpQuickEditListProps";
import { escape } from "@microsoft/sp-lodash-subset";
import ReactDataGrid from "react-data-grid";
import { IABR } from "../../../../models";
import { ABRService } from "../../../../services";
import { SPHttpClient } from "@microsoft/sp-http";

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

  // protected onInit(): Promise<void> {
  //   this.abrService = new ABRService(
  //     this.context.pageContext.web.absoluteUrl,
  //     this.context.SPHttpClient
  //   );
  //   return Promise.resolve();
  // }

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
  public componentDidMount(): void {
    this.abrService = new ABRService(
      this.context.pageContext.web.absoluteUrl,
      this.context.SPHttpClient
    );
    this.abrService.getABRS();
  }
  // private _getABR(): void {
  //   this.abrService.getABRS()
  //   .then((abrs:IABR[]) =>{
  //     this._renderABR(this.)
  //   }

  //   );
  // }
}
