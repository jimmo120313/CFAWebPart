import {
  ISolutionDropdownOption,
  IBrigadeDataListOption
} from "../../../../models/index";

export interface ILandingPageState {
  reviewPeriodOption: ISolutionDropdownOption[];
  districtOption: ISolutionDropdownOption[];
  selectedBrigade: IBrigadeDataListOption[];
  brigadeOption: IBrigadeDataListOption[];
  isGetBrigadeDisabled: boolean;
  selectedDistrict: string;
  selectedReviewPeriod: string;
}
