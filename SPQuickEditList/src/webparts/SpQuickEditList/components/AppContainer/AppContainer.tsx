import * as React from "react";
import { IAppContainerProps } from "./IAppContainerProps";
import styles from "./AppContainer.module.scss";
import { SpQuickEditList } from "../SpQuickEditList/SpQuickEditList";
import { LandingPage } from "../LandingPage";
import { sp } from "@pnp/sp";
import { IBrigade } from "../../../../models";

export class AppContainer extends React.Component<IAppContainerProps, {}> {
  public render(): React.ReactElement<IAppContainerProps> {
    return (
      <div>
        <LandingPage />
        <SpQuickEditList />
      </div>
    );
  }
}
