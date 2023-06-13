import { BUSINESS_DATA, Storage } from "../storage";

export class BranchOffice {
    id : number;
    businessOwner : number;
    name: string;
    city: string;
    state: string;
    address: string;
    addressIndications: string;
    latitude: number;
    length: number;
    image: string;
    phone : string
    constructor() {
        this.businessOwner = Storage.getAll(BUSINESS_DATA).id;
        this.name = '';
        this.city = '';
        this.state = '';
        this.address = '';
        this.addressIndications = '';
        this.latitude = 0;
        this.length = 0;
        this.image = '';
        this.phone = ''
    }
}