import { TAddress } from "./address";
import { TCommonData } from "./commonData";
import { TCompany } from "./company";
import { TEntrepreneur } from "./entrepreneur";
import { TSocial } from "./social";

type TForm = TCommonData & {
    ownershipForm?: "entrepreneur" | "company";
    entrepreneurData?: TEntrepreneur;
    companyData?: TCompany;
    registrationAddress: TAddress;
    addressesMatch: boolean;
    residentialAddress?: TAddress;
    socials: TSocial[];
};

export { TForm };