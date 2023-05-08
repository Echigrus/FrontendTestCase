import { Dayjs } from "dayjs";

type TCompany = {
    fullName: string;
    shortName: string;
    INN: string;
    scanINN?: string | File;
    dateOfRegistration?: Dayjs;
    OGRN: string;
    scanOGRN?: string | File;
};

export { TCompany };