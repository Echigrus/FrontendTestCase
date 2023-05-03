import { TAddress } from "./address";
import { TCommonData } from "./commonData";
import { TCompany } from "./company";
import { TEntrepreneur } from "./entrepreneur";
import { TSocial } from "./social";

type TForm = TCommonData & {
    entrepreneur: boolean;
    entrepreneurData?: TEntrepreneur;
    companyData?: TCompany;
    registrationAddress: TAddress;
    residentialAddress: TAddress;
    socials: TSocial[];
};

export { TForm };