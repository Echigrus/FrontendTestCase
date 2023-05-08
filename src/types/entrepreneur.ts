import { Dayjs } from "dayjs";

type TEntrepreneur = {
    INN: string;
    scanINN?: string | File;
    dateOfRegistration?: Dayjs;
    OGRNIP: string;
    scanOGRNIP?: string | File;
    leaseContract?: string | File;
    noLeaseContract: boolean;
    scanEGRIP?: string | File;
};

export { TEntrepreneur };