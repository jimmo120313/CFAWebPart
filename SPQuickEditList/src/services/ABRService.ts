import { sp, CamlQuery } from "@pnp/sp";
import {
  ISolutionDropdownOption,
  IBrigadeDataListOption,
  IActionPlan
} from "../models/index";
import * as CamlBuilder from "camljs";

export class ABRService {
  private reviewPeriod: ISolutionDropdownOption[] = [];
  private district: ISolutionDropdownOption[] = [];

  public async _getBrigadeOption(
    district: string
  ): Promise<IBrigadeDataListOption[]> {
    let q: string = "District/Title eq '" + district + "'";
    let brigade: IBrigadeDataListOption[] = [];
    const allBrigade = await sp.web.lists
      .getByTitle("Brigade")
      .items.select("ID", "Title", "District/Title")
      .expand("District")
      .filter(q)
      .getAll();

    for (let i = 0; i < allBrigade.length; i++) {
      brigade.push({
        brigadeId: allBrigade[i].ID,
        brigadeName: allBrigade[i].Title
      });
    }
    return brigade;
  }

  public async _getReviewPeriodOption(): Promise<ISolutionDropdownOption[]> {
    sp.web.lists
      .getByTitle("Statements")
      .fields.getByInternalNameOrTitle("Review Period")
      .get()
      // .items.select("Review_x0020_Period").expand("").get()
      .then(f => {
        //console.log(f.Choices);
        f.Choices.forEach(e => {
          let reviewPeriodObj: ISolutionDropdownOption = {
            key: e,
            text: e
          };
          this.reviewPeriod.push(reviewPeriodObj);
        });
      });
    return this.reviewPeriod;
  }

  public async _getDistrictOption(): Promise<ISolutionDropdownOption[]> {
    sp.web.lists
      .getByTitle("District")
      .items.select("Title")
      .get()
      .then((items: any[]) => {
        items.forEach(d => {
          let districtObj: ISolutionDropdownOption = {
            key: d.etag,
            text: d.Title
          };
          this.district.push(districtObj);
        });
      });
    return this.district;
  }

  public async _getActionPlanMaster(
    reviewPeriod: string,
    selectedBrigade: IBrigadeDataListOption[]
  ): Promise<void> {
    let brigadesId = new Array();

    selectedBrigade.forEach(e => {
      brigadesId.push(e.brigadeId);
    });

    let query = new CamlBuilder()
      .View([
        "ID",
        "Review",
        "Year",
        "DateStarted",
        "ActionPlanCompletedBy",
        "District",
        "Region"
      ])
      .LeftJoin("Brigade", "Brigade")
      .Select("ID", "Title")
      .Query()
      .Where()
      .LookupField("Brigade")
      .Id()
      .In(brigadesId);

    let xml = query.ToString();
    console.log(xml);
    let actionPlanDetail: IActionPlan[] = [];
    const allActionPlan = await sp.web.lists
      .getByTitle("Action Plans")
      .getItemsByCAMLQuery({ ViewXml: query.ToString() });
    // .items.select(
    //   "Review/ID",
    //   "Brigade/ID",
    //   "Brigade/Title",
    //   "Year",
    //   "DateStarted",
    //   "ActionPlanCompletedBy",
    //   "District/ID",
    //   "District/Title",
    //   "Region/ID",
    //   "Region/Title"
    // )
    // .expand("Review", "Brigade", "District", "Region")
    // .filter("Brigade/ID in " + brigadesId)
    //.getAll();
    console.log(allActionPlan);

    // let actionPlanDetail: IActionPlan[] = [];
    // const allActionPlan = await sp.web.lists
    //   .getByTitle("Action Plans")
    //   .items.select(
    //     "Review/ID",
    //     "Brigade/ID",
    //     "Brigade/Title",
    //     "Year",
    //     "DateStarted",
    //     "ActionPlanCompletedBy",
    //     "District/ID",
    //     "District/Title",
    //     "Region/ID",
    //     "Region/Title"
    //   )
    //   .expand("Review", "Brigade", "District", "Region")
    //   .filter("Brigade/ID in " + brigadesId)
    //   .getAll();
    // console.log(allActionPlan);
    // for (let i = 0; i < allActionPlan.length; i++) {
    //   actionPlanDetail.push({
    //     key: i,
    //     brigadeName: allBrigade[i].Title
    //   });
    // }
    // return brigade;
  }
}
