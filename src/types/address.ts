type TAddress = {
    country: string;
    region: string;
    city: string;
    street: string;
    house: number;
    apartment?: number;
    noApartment: boolean;
    dateOfRegistration?: Date;
};

export { TAddress };