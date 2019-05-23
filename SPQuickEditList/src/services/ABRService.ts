import { IABR } from "../models";
import { sp } from "@pnp/sp";
import { IBrigade, IReviewPeriod, IDistrict, IDropdownOption } from "../models/index";

const LIST_API_ENDPOINT: string = `/_api/web/lists/getbytitle('Brigade')`;
const SELECT_QUERY: string = `$select=Id,Title`;

export class ABRService {
  public async _getBrigadeDetail(): Promise<void> {
    sp.web.lists
      .getByTitle("Brigade")
      .items.get()
      .then((items: IBrigade[]) => {
        console.log(items);
      });
  }
  private reviewPeriod: IDropdownOption[] = [];
  private district: IDropdownOption[] = [];

  public async _getReviewPeriodOption(): Promise<IDropdownOption[]> {
    sp.web.lists
      .getByTitle("Statements")
      .fields.getByInternalNameOrTitle("Review Period")
      .get()
      // .items.select("Review_x0020_Period").expand("").get()
      .then(f => {
        console.log(f.Choices);
        f.Choices.forEach(e => {
          let reviewPeriodObj: IDropdownOption = {
            key: e,
            text: e
          };
          this.reviewPeriod.push(reviewPeriodObj);
        });
      });
    return this.reviewPeriod;
  }

  public async _getDistrictOption(): Promise<IDropdownOption[]> {
    sp.web.lists
      .getByTitle("District")
      // .items.select("Title", "Region/Title")
      // .expand("Region")
      .items.select("Title")
      .get()
      .then((items: any[]) => {
        items.forEach(d => {
          let districtObj: IDropdownOption = {
            key: d.etag,
            text: d.Title
          };
          this.district.push(districtObj);
        });
      });
    return this.district;
  }
}
