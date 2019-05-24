import {
  ISolutionDropdownOption,
  ISolutionDataListOption
} from "../../../../models/index";

export interface ILandingPageState {
  reviewPeriodOption: ISolutionDropdownOption[];
  districtOption: ISolutionDropdownOption[];
  selectedBrigade: ISolutionDataListOption[];
  brigadeOption: ISolutionDataListOption[];
  isGetBrigadeDisabled: boolean;
  selectedDistrict: string;
  selectedReviewPeriod: string;
}
