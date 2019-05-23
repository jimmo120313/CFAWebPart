import { IReviewPeriod, IDropdownOption } from "../../../../models/index";

export interface ILandingPageState {
  reviewPeriod: IDropdownOption[];
  district: IDropdownOption[];
}
