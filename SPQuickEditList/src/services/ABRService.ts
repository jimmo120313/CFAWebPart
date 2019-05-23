import { IABR } from "../models";
import { sp } from "@pnp/sp";
import { IBrigade, IReviewPeriod, IDistrict } from "../models/index";

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
  private reviewPeriod: IReviewPeriod[] = [];
  private district: IDistrict[] = [];

  public async _getReviewPeriod(): Promise<IReviewPeriod[]> {
    sp.web.lists
      .getByTitle("Statements")
      .fields.getByInternalNameOrTitle("Review Period")
      .get()
      // .items.select("Review_x0020_Period").expand("").get()
      .then(f => {
        console.log(f.Choices);
        f.Choices.forEach(e => {
          let reviewPeriodObj: IReviewPeriod = {
            key: e,
            text: e
          };
          this.reviewPeriod.push(reviewPeriodObj);
        });
      });
    return this.reviewPeriod;
  }

  public async _getDistrict(): Promise<void> {
    sp.web.lists
      .getByTitle("District")
      .items.select("Title", "Lookup/Region")
      .expand("Lookup/Region")
      .get()
      .then((items: any[]) => {
        console.log(items);
      });
  }
}
