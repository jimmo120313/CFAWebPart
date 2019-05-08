import * as React from "react";
import { IAppContainerProps } from "./IAppContainerProps";
import styles from "./AppContainer.module.scss";
import { SpQuickEditList } from "../SpQuickEditList/SpQuickEditList";

export class AppContainer extends React.Component<IAppContainerProps, {}> {
  public render(): React.ReactElement<IAppContainerProps> {
    return (
      <div className={styles.spQuickEditList}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <SpQuickEditList description={"test"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
