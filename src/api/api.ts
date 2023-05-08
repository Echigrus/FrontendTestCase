import { ApiBase } from "./apiBase";
import { CompanyGroup } from "./methodGroups/companyGroup";
import { FormGroup } from "./methodGroups/formGroup";

class Api extends ApiBase {}

interface Api
    extends CompanyGroup,
        FormGroup {}

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                if (name !== 'constructor') {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            }
        });
    }); 
}

applyMixins(Api, [
    CompanyGroup,
    FormGroup
]);

export { Api };