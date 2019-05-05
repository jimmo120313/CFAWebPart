import * as React from "react";
import styles from "./SpQuickEditList.module.scss";
import { ISpQuickEditListProps } from "./ISpQuickEditListProps";
import { escape } from "@microsoft/sp-lodash-subset";

export class SpQuickEditList extends React.Component<
  ISpQuickEditListProps,
  {}
> {
  public render(): React.ReactElement<ISpQuickEditListProps> {
    return (
      <div className={styles.spQuickEditList}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>
                Customize SharePoint experiences using Web Parts.
              </p>
              <p className={styles.description}>
                {escape(this.props.description)}
              </p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
