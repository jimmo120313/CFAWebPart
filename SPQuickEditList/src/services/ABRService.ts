import { sp, CamlQuery } from "@pnp/sp";
import {
  ISolutionDropdownOption,
  IBrigadeDataListOption,
  IActionPlan
} from "../models/index";
import * as CamlBuilder from "camljs";
import * as strings from "SpQuickEditListWebPartStrings";

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
  ): Promise<IActionPlan[]> {
    let brigadesId = new Array();

    selectedBrigade.forEach(e => {
      brigadesId.push(e.brigadeId);
    });

    let query = new CamlBuilder()
      .View([
        "ID",
        "BrigadeId",
        "BrigadeTitle",
        "Year",
        "DateStarted",
        "ActionPlanCompletedBy",
        "DistrictId",
        "DistrictTitle",
        "RegionId",
        "RegionTitle",
        "ReviewID"
      ])
      .LeftJoin("Brigade", "Brigade")
      .Select("Title", "BrigadeTitle")
      .Select("ID", "BrigadeId")
      .LeftJoin("District", "District")
      .Select("Title", "DistrictTitle")
      .Select("ID", "DistrictId")
      .LeftJoin("Region", "Region")
      .Select("Title", "RegionTitle")
      .Select("ID", "RegionId")
      .LeftJoin("Review", "Review")
      .Select("ID", "ReviewID")
      .Query()
      .Where()
      .LookupField("Brigade")
      .Id()
      .In(brigadesId)
      .ToString();

    let actionPlanDetail: IActionPlan[] = [];
    const allActionPlan = await sp.site.get();
    // .expand("RootFolder, ParentWeb")
    // .select("Title,RootFolder/ServerRelativeUrl, ParentWeb/Url")
    // .get();
    console.log("test1");
    console.log(allActionPlan);

    const row = allActionPlan.Row;

    for (let i = 0; i < row.length; i++) {
      let reviewURL = ""; //sp.web.getList("ABRReview").toUrl;
      // `AAATEST/ABR/Demo/Lists/ABRReview/AllItems.aspx?View={BC3455D0-DFC9-41F3-B0DA-379CAD42E8B0}&FilterField1=ID&FilterValue1=` + row[i].ReviewID;
      let reportURL = "";
      actionPlanDetail.push({
        reviewId: row[i].ReviewID,
        brigadeId: row[i].BrigadeId,
        brigadeName: row[i].BrigadeTitle,
        reviewPeriod: row[i].Year,
        dateStarted: row[i].DateStarted,
        completedBy: row[i].ActionPlanCompletedBy,
        districtId: row[i].DistrictId,
        districtName: row[i].DistrictTitle,
        regionId: row[i].RegionId,
        regionName: row[i].RegionTitle,
        actionPlanReportURL: reportURL,
        reviewDetail: reviewURL
      });
    }
    console.log(actionPlanDetail);
    return actionPlanDetail;
  }
}
