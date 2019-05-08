import { IABR } from "../models";
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions,
  SPHttpClientConfiguration
} from "@microsoft/sp-http";

const LIST_API_ENDPOINT: string = `/_api/web/lists/getbytitle('Brigade')`;
const SELECT_QUERY: string = `$select=Id,Title`;

export class ABRService {
  private _spHttpOptions: any = {
    getNoMetadata: <ISPHttpClientOptions>{
      headers: { ACCEPT: "application/json; odata.metadata=none" }
    }
  };

  constructor(private siteAbsoluteUrl: string, private client: SPHttpClient) {}

  public getABRS(): Promise<IABR[]> {
    let promise: Promise<IABR[]> = new Promise<IABR[]>((resolve, reject) => {
      let query = `${
        this.siteAbsoluteUrl
      }${LIST_API_ENDPOINT}/items?${SELECT_QUERY}`;
      this.client
        .get(
          query,
          SPHttpClient.configurations.v1,
          this._spHttpOptions.getNoMetadata
        )
        .then(
          (response: SPHttpClientResponse): Promise<{ value: IABR[] }> => {
            return response.json();
          }
        )
        .then((response: { value: IABR[] }) => {
          resolve(response.value);
        })
        .catch((error: any) => {
          reject(error);
        });
    });

    return promise;
  }
  // private static _abrReview: IABR[] = <IABR[]>[
  //   {
  //     id: "1",
  //     reviewId: "2",
  //     brigadeId: "2",
  //     brigadeName: "Name2",
  //     reviewPeriod: "09/2019",
  //     dateStarted: "07/05/2019",
  //     completedBy: "Jimmy Mo",
  //     districtId: "2",
  //     districtName: "District 2",
  //     regionId: "2",
  //     regionName: "Region 2",
  //     actionPlanReportURL: "https://Google.com",
  //     reviewDetail: "Review Detail"
  //   },
  //   {
  //     id: "2",
  //     reviewId: "3",
  //     brigadeId: "3",
  //     brigadeName: "Name3",
  //     reviewPeriod: "09/2019",
  //     dateStarted: "07/05/2019",
  //     completedBy: "Jimmy Mo",
  //     districtId: "3",
  //     districtName: "District 3",
  //     regionId: "3",
  //     regionName: "Region 3",
  //     actionPlanReportURL: "https://Google.com",
  //     reviewDetail: "Review Detail"
  //   }
  // ];

  // public static getABRs(): IABR[] {
  //   return this._abrReview;
  // }

  // public static getABR(abrId: string): IABR {
  //   return this._abrReview.filter((abr: IABR) => abr.id === abrId)[0];
  // }
}
