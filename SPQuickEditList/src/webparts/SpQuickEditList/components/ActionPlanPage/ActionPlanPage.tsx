import * as React from "react";
import { IActionPlanPageProps, IActionPlanPageState } from "./index";
import { ActionPlanMasterList } from "../ActionPlanMasterList/index";
import {
  IReviewPeriod,
  ISolutionDropdownOption,
  IBrigadeDataListOption
} from "../../../../models/index";
require("./ActionPlanPage.module.scss");
import { ABRService } from "../../../../services/ABRService";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export class ActionPlanPage extends React.Component<
  IActionPlanPageProps,
  IActionPlanPageState
> {
  private brigade = new ABRService();

  constructor(props: IActionPlanPageProps) {
    super(props);
    this.state = {
      brigadeOption: this.props.selectedBrigade,
      reviewPeriod: this.props.reviewPeriod,
      ratingOption: [],
      ViabilityOption: [],
      EndState: [],
      Classification: []
    };
  }
  public async componentDidMount(): Promise<void> {
    //Get Rating
    // this.brigade
    //   ._getReviewPeriodOption()
    //   .then((option: ISolutionDropdownOption[]) => {
    //     this.setState({ reviewPeriodOption: option });
    //   });
    //Get Viability Category
    // this.brigade
    //   ._getDistrictOption()
    //   .then((option: ISolutionDropdownOption[]) => {
    //     this.setState({ districtOption: option });
    //   });
    // //Get End State
    // this.brigade
    //   ._getDistrictOption()
    //   .then((option: ISolutionDropdownOption[]) => {
    //     this.setState({ districtOption: option });
    //   });
    // //Get Classification
    // this.brigade
    //   ._getDistrictOption()
    //   .then((option: ISolutionDropdownOption[]) => {
    //     this.setState({ districtOption: option });
    //   });
  }

  public render(): React.ReactElement<IActionPlanPageProps> {
    return (
      <div>
        <Dropdown
          placeHolder="Brigade (Multi Select)"
          options={this.state.brigadeOption}
          //onChanged={this._onReviewPeriodSelected}
        />
        {/*
        <Dropdown
          placeHolder="Rating (Multi Select)"
          options={this.state.districtOption}
          onChanged={this._onDistrictSelected}
        />
        <Dropdown
          placeHolder="Viability Category"
          options={this.state.districtOption}
          onChanged={this._onDistrictSelected}
        />
        <Dropdown
          placeHolder="End State (Question Ref)"
          options={this.state.districtOption}
          onChanged={this._onDistrictSelected}
        />
        <Dropdown
          placeHolder="Classification"
          options={this.state.districtOption}
          onChanged={this._onDistrictSelected}
        /> */}
        <ActionPlanMasterList
          reviewPeriod={this.state.reviewPeriod}
          selectedBrigade={this.state.brigadeOption}
        />
        {/* <ActionPlanList /> */}
      </div>
    );
  }
}
