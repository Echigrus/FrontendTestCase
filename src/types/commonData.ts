import { Dayjs } from "dayjs";

type TCommonData = {
    name: string;
    surname: string;
    patronymic?: string;
    city: string;
    citizenship: string;
    male: boolean;
    dateOfBirth?: Dayjs;
    placeOfBirth: string;
};

export { TCommonData };