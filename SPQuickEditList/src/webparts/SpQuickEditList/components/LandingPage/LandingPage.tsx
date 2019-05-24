import * as React from "react";
import { ILandingPageProps, ILandingPageState } from "./index";
import {
  IBrigade,
  IReviewPeriod,
  ISolutionDropdownOption,
  ISolutionDataListOption
} from "../../../../models/index";
import styles from "./LandingPage.module.scss";
import { ABRService } from "../../../../services/ABRService";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Selection } from "office-ui-fabric-react/lib/Selection";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { TextField } from "office-ui-fabric-react/lib/TextField";

import {
  CommandBarButton,
  IButtonProps
} from "office-ui-fabric-react/lib/Button";
import {
  DetailsList,
  DetailsListLayoutMode
} from "office-ui-fabric-react/lib/DetailsList";

export class LandingPage extends React.Component<
  ILandingPageProps,
  ILandingPageState
> {
  public brigade = new ABRService();

  constructor(props: ILandingPageProps) {
    super(props);
    this.state = {
      reviewPeriodOption: [],
      districtOption: [],
      brigadeOption: [],

      selectedBrigade: [],
      selectedDistrict: "",
      selectedReviewPeriod: "",

      isGetBrigadeDisabled: false
    };
  }

  public async componentDidMount(): Promise<void> {
    //this.brigade._getBrigadeDetail();
    this.brigade
      ._getReviewPeriodOption()
      .then((option: ISolutionDropdownOption[]) => {
        this.setState({ reviewPeriodOption: option });
      });
    this.brigade
      ._getDistrictOption()
      .then((option: ISolutionDropdownOption[]) => {
        this.setState({ districtOption: option });
      });
  }

  public _onGetBrigade = async (): Promise<void> => {
    let brigade2 = new ABRService();
    brigade2
      ._getBrigadeOption(this.state.selectedDistrict)
      .then((option2: ISolutionDataListOption[]) => {
        console.log("test1");
        console.log(option2);
        console.log("test1.1");
        this.setState({ brigadeOption: option2 });
      })
      .catch(e => {
        console.log(e);
      });
  };

  private _selection = new Selection({
    // onSelectionChanged: () => this.setState({ selectionDetails: "" })
  });

  private _onDistrictSelected = (item: IDropdownOption): void => {
    this.setState({ selectedDistrict: item.text });
  };
  private _onReviewPeriodSelected = (item: IDropdownOption): void => {
    this.setState({ selectedReviewPeriod: item.text });
  };

  public render(): React.ReactElement<ILandingPageProps> {
    return (
      <div>
        <Dropdown
          placeHolder="Select Year"
          options={this.state.reviewPeriodOption}
          onChanged={this._onReviewPeriodSelected}
        />
        <Dropdown
          placeHolder="Select District"
          options={this.state.districtOption}
          onChanged={this._onDistrictSelected}
        />

        <div style={{ display: "flex", alignItems: "stretch", height: "40px" }}>
          <CommandBarButton
            data-automation-id="test2"
            disabled={this.state.isGetBrigadeDisabled}
            //checked={checked}
            iconProps={{ iconName: "Mail" }}
            text="Select Brigade"
            onClick={this._onGetBrigade}
          />
        </div>

        <TextField
          //className={exampleChildClass}
          label="Filter by name:"
          //onChange={this._onFilter}
        />
        {/* <MarqueeSelection selection={this._selection}> */}
        <DetailsList
          items={[
            {
              key: 111,
              name: "Brigade",
              value: 111
            }
          ]}
          columns={[
            {
              key: "Brigade",
              name: "Brigade",
              fieldName: "",
              minWidth: 100,
              isResizable: true
            }
          ]}
          setKey="set"
          layoutMode={DetailsListLayoutMode.fixedColumns}
          selection={this._selection}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          //onItemInvoked={this._onItemInvoked}
        />
        {/* </MarqueeSelection> */}
      </div>
    );
  }
}
