import * as React from "react";
import { IAppContainerProps } from "./IAppContainerProps";
import styles from "./AppContainer.module.scss";
import { SpQuickEditList } from "../SpQuickEditList/SpQuickEditList";
import { LandingPage } from "../LandingPage";
import { sp } from "@pnp/sp";
import {
  IBrigade,
  IReviewPeriod,
  ISolutionDropdownOption,
  IBrigadeDataListOption
} from "../../../../models/index";
import { IAppContainerState } from "./IAppContainerState";

export class AppContainer extends React.Component<
  IAppContainerProps,
  IAppContainerState
> {
  constructor(props: IAppContainerProps) {
    super(props);
    this.state = {
      selectedBrigade: [],
      selectedReviewPeriod: "",
      isActionPlanCreated: false
    };
  }

  private _createActionPlanClicked = (
    brigades: IBrigadeDataListOption[],
    reviewPeriod: string
  ): void => {
    debugger;
    this.setState({
      selectedBrigade: brigades,
      selectedReviewPeriod: reviewPeriod,
      isActionPlanCreated: true
    });
  };

  public render(): React.ReactElement<IAppContainerProps> {
    if (this.state.isActionPlanCreated) {
      return <SpQuickEditList />;
    } else {
      return (
        <div>
          <LandingPage onCreateActionPlan={this._createActionPlanClicked} />
          {/* <SpQuickEditList /> */}
        </div>
      );
    }
  }
}
