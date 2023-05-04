type TEntrepreneur = {
    INN: string;
    scanINN?: string | File;
    registrationDate?: Date;
    OGRNIP: string;
    scanOGRNIP?: string | File;
    leaseContract?: string | File;
    noLeaseContract: boolean;
    scanEGRIP?: string | File;
};

export { TEntrepreneur };