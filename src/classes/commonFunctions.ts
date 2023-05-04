import { RuleObject } from "antd/es/form";

class Common {
    public static dateValidator(_: RuleObject, date: Date) {
        if(date != null && (date >= new Date() || date <= new Date(1900, 0, 1))){
            return Promise.reject(new Error("Некорректная дата."));
        }
        return Promise.resolve();
    }
}

export { Common };