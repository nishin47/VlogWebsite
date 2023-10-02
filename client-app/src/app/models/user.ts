export interface User {
    email: string;
    displayName: string;
    token: string;
    image?: string;
    firstName?: string;
    lastName?: string;
}

export interface UserFormValues {

    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    countrycode?:string;
    phonenumber?:string;
    otp?:string;

    
}

export interface LoginValues {

    email: string;
    password: string;
    firsttime?: boolean;
    otp?: string

}

