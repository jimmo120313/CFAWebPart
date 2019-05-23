import * as React from "react";
import { ILandingPageProps, ILandingPageState } from "./index";
import { IBrigade, IReviewPeriod } from "../../../../models/index";
import styles from "./LandingPage.module.scss";
import { ABRService } from "../../../../services/ABRService";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";

export class LandingPage extends React.Component<
  ILandingPageProps,
  ILandingPageState
> {
  public brigade = new ABRService();

  constructor(props: ILandingPageProps) {
    super(props);
    this.state = {
      reviewPeriod: [],
      district: []
    };
  }

  public async componentDidMount(): Promise<void> {
    //this.brigade._getBrigadeDetail();
    this.brigade._getReviewPeriod().then((option: IReviewPeriod[]) => {
      this.setState({ reviewPeriod: option });
    });
    this.brigade._getDistrict();
  }

  public render(): React.ReactElement<ILandingPageProps> {
    return (
      <div>
        <Dropdown
          placeHolder="Select Year"
          options={this.state.reviewPeriod}
          //onChanged={this._onChange}
        />
        <Dropdown
          placeHolder="Select District"
          options={this.state.district}
          //onChanged={this._onChange}
        />
      </div>
    );
  }
}
