import { ApiBase } from "@api/apiBase";
import { CompanyInfoResp } from "@api/responseModels/company/companyInfoResp";
import { RequestResult } from "@api/responseModels/requestResult";

class CompanyGroup extends ApiBase {
    async getCompanyInfo(inn: string): Promise<RequestResult<CompanyInfoResp>> {
        const result = await this.post<CompanyInfoResp>('/findById/party', {
            query: inn,
            count: 1,
            branch_type: "MAIN",
            type: "LEGAL"
        })
        return result;
    }
}

export { CompanyGroup };