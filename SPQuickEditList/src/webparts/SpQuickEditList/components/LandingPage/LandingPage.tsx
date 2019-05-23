import * as React from "react";
import { ILandingPageProps, ILandingPageState } from "./index";
import { IBrigade, IReviewPeriod, IDropdownOption } from "../../../../models/index";
import styles from "./LandingPage.module.scss";
import { ABRService } from "../../../../services/ABRService";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { Selection } from "office-ui-fabric-react/lib/Selection";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DetailsList } from "office-ui-fabric-react/lib/DetailsList";

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
    this.brigade._getReviewPeriodOption().then((option: IDropdownOption[]) => {
      this.setState({ reviewPeriod: option });
    });
    this.brigade._getDistrictOption().then((option: IDropdownOption[]) => {
      this.setState({ district: option });
    });
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

        <TextField
          className={exampleChildClass}
          label="Filter by name:"
          onChange={this._onFilter}
          styles={{ root: { maxWidth: '300px' } }}
        />
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={items}
            columns={this._columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            onItemInvoked={this._onItemInvoked}
          />
        </MarqueeSelection>
      </div>
    );
  }
}
