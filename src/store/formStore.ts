import { GlobalConstants } from "@constants/global";
import { makeAutoObservable } from "mobx";
import { TAddress } from "types/address";
import { TCommonData } from "types/commonData";
import { TCompany } from "types/company";
import { TEntrepreneur } from "types/entrepreneur";
import { TForm } from "types/form";
import { TSocial } from "types/social";

const emptyCommonData: TCommonData = {
    name: "",
    surname: "",
    patronymic: null,
    city: GlobalConstants.Cities[0],
    citizenship: GlobalConstants.Countries[0],
    male: true,
    dateOfBirth: null,
    placeOfBirth: ""
};

const emptyEntrepreneur: TEntrepreneur = {
    INN: "",
    scanINN: null,
    registrationDate: null,
    OGRNIP: "",
    scanOGRNIP: null,
    leaseContract: null,
    noLeaseContract: false,
    scanEGRIP: null
};

const emptyCompany: TCompany = {
    fullName: "",
    shortName: "",
    INN: "",
    scanINN: null,
    registrationDate: null,
    OGRN: "",
    scanOGRN: null
};

const emptyAddress: TAddress = {
    country: "",
    region: "",
    city: "",
    street: "",
    house: 1,
    apartment: 1,
    noApartment: false,
    dateOfRegistration: null
};

class FormStore {
    private commonData: TCommonData = emptyCommonData;
    ownershipForm?: TForm['ownershipForm'] = null;
    private entrepreneurData?: TEntrepreneur = null;
    private companyData?: TCompany = null;
    private registrationAddress: TAddress = emptyAddress;
    addressesMatch: boolean = false;
    private residentialAddress?: TAddress = emptyAddress;
    private socials: TSocial[] = [];
    
    constructor() {
        makeAutoObservable(this);
    }

    // Getters
    getCommonData = () => this.commonData;
    getEntrepeneurData = () => this.entrepreneurData;
    getCompanyData = () => this.companyData;
    getRegistrationAddress = () => this.registrationAddress;
    getResidentialAddress = () => this.residentialAddress;
    getSocials = () => this.socials;

    // Setters
    changeCommonData = (data: TCommonData) => {
        this.commonData = data;
    }

    changeOwnershipForm = (form: TForm['ownershipForm']) => {
        switch (form) {
            case "company":
                this.entrepreneurData = null;
                this.companyData = emptyCompany;
                break;
            case "entrepreneur":
                this.companyData = null;
                this.entrepreneurData = emptyEntrepreneur;
                break;
            default:
                this.companyData = null;
                this.entrepreneurData = null;
                break;
        }
        this.ownershipForm = form;
    }

    changeEntrepreneurData = (data: TEntrepreneur) => {
        this.entrepreneurData = data;
    }

    changeCompanyData = (data: TCompany) => {
        this.companyData = data;
    }

    changeRegistrationAddress = (address: TAddress) => {
        this.registrationAddress = address;
    }

    changeResidentialAddress = (address: TAddress) => {
        this.residentialAddress = address;
    }

    changeSocials = (data: TSocial[]) => {
        this.socials = data;
    }

    // Utils
    clear = () => {
        this.commonData = emptyCommonData;
    }

    setEqualAddresses = () => {
        this.addressesMatch = true;
        this.residentialAddress = this.registrationAddress;
    }

    setUnequalAddresses = () => {
        this.addressesMatch = false;
        this.residentialAddress = emptyAddress;
    }
}

export { FormStore };