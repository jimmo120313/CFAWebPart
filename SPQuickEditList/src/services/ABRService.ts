import { IABR } from "../models";

export class ABRService {
  private static _abrReview: IABR[] = <IABR[]>[
    {
      id: "1",
      reviewId: "2",
      brigadeId: "2",
      brigadeName: "Name2",
      reviewPeriod: "09/2019",
      dateStarted: "07/05/2019",
      completedBy: "Jimmy Mo",
      districtId: "2",
      districtName: "District 2",
      regionId: "2",
      regionName: "Region 2",
      actionPlanReportURL: "https://Google.com",
      reviewDetail: "Review Detail"
    },
    {
      id: "2",
      reviewId: "3",
      brigadeId: "3",
      brigadeName: "Name3",
      reviewPeriod: "09/2019",
      dateStarted: "07/05/2019",
      completedBy: "Jimmy Mo",
      districtId: "3",
      districtName: "District 3",
      regionId: "3",
      regionName: "Region 3",
      actionPlanReportURL: "https://Google.com",
      reviewDetail: "Review Detail"
    }
  ];

  public static getABRs(): IABR[] {
    return this._abrReview;
  }

  public static getABR(abrId: string): IABR {
    return this._abrReview.filter((abr: IABR) => abr.id === abrId)[0];
  }
}
