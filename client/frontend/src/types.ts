import { Url } from "url";

export type WindowWithEthereum = typeof window & {
    ethereum: any;
};

export interface State {
    provider: any;
    signer: any;
    contract: any;
    account: any;
};

export type Product = {
    id: string,
    name: string,
    manufacturer: string,
    manufacturerName: string,
    distributor?: string,
    distributorName?: string
    retailer?: string,
    retailerName?: string,
    customer?: string,
    status: string,
    price: bigint,
    image?: string
}

export enum Role {
    CUSTOMER = 'customer',
    MANUFACTURER = 'manufacturer',
    DISTRIBUTOR = 'distributor',
    RETAILER = 'retailer'
}