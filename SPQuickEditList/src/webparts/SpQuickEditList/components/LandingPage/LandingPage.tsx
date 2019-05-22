import * as React from "react";
import { ILandingPageProps } from "./ILandingPageProps";
import styles from "./LandingPage.module.scss";
import { SpQuickEditList } from "../SpQuickEditList/SpQuickEditList";
import { sp } from "@pnp/sp";
import { IBrigade } from "../../../../models";
import { ABRService } from "../../../../services/ABRService";
import {
  Dropdown,
  IDropdown,
  IDropdownOption
} from "office-ui-fabric-react/lib/Dropdown";

export class LandingPage extends React.Component<ILandingPageProps, {}> {
  public brigade = new ABRService();

  public render(): React.ReactElement<ILandingPageProps> {
    return (
      <div>
        <Dropdown
          placeHolder="Select store"
          options={storeOption}
          onChanged={this._onChange}
        />
      </div>
    );
  }

  public componentDidMount(): void {
    this.brigade._getBrigadeDetail();
  }

  public async _getBrigadeDetail(): Promise<void> {
    sp.web.lists
      .getByTitle("Brigade")
      .items.get()
      .then((items: IBrigade[]) => {
        console.log(items);
      });
  }
}
