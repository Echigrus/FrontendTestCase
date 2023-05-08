import { ApiBase } from "@api/apiBase";
import { FormResp } from "@api/responseModels/form/formResp";
import { RequestResult } from "@api/responseModels/requestResult";
import { TAddress } from "types/address";
import { TCommonData } from "types/commonData";
import { TCompany } from "types/company";
import { TEntrepreneur } from "types/entrepreneur";
import { TForm } from "types/form";
import { TSocial } from "types/social";

class FormGroup extends ApiBase {
    async saveForm(
        common: TCommonData,
        ownershipForm: TForm["ownershipForm"],
        entrepreneurData: TEntrepreneur,
        companyData: TCompany,
        registrationAddress: TAddress,
        addressesMatch: boolean,
        residentialAddress: TAddress,
        socials: TSocial[]
    ): Promise<RequestResult<FormResp>> {
        const result = await this.post<FormResp>('/save-form', { 
            ...common,
            ownershipForm: ownershipForm,
            entrepreneurData: entrepreneurData,
            companyData: companyData,
            registrationAddress: registrationAddress,
            addressesMatch: addressesMatch,
            residentialAddress: residentialAddress,
            socials: socials
        });
        return result;
    }
}

export { FormGroup };