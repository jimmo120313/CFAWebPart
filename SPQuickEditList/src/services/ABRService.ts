import { IABR } from "../models";
import { sp } from "@pnp/sp";

const LIST_API_ENDPOINT: string = `/_api/web/lists/getbytitle('Brigade')`;
const SELECT_QUERY: string = `$select=Id,Title`;

export class ABRService {
  private _spHttpOptions: any = {
    getNoMetadata: <ISPHttpClientOptions>{
      headers: { ACCEPT: "application/json; odata.metadata=none" }
    }
  };

  constructor(private siteAbsoluteUrl: sp.web, private client: SPHttpClient) {}
}
