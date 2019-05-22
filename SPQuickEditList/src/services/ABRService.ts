import { IABR } from "../models";
import { sp } from "@pnp/sp";
import { IBrigade } from "../models/IBrigade";

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

  public async _get(): Promise<void> {
    sp.web.lists
      .getByTitle("Brigade")
      .items.get()
      .then((items: IBrigade[]) => {
        console.log(items);
      });
  }
}
