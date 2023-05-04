type TCompany = {
    fullName: string;
    shortName: string;
    INN: string;
    scanINN?: string | File;
    registrationDate?: Date;
    OGRN: string;
    scanOGRN?: string | File;
};

export { TCompany };