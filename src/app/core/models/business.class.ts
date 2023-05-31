import { BranchOffice } from "./branch-office.class";

export class User {
    name: string;
    type: string;
    ownerId: number;
    deliveryPerWeek: number;
    branchOfficeList: Array<BranchOffice>
    constructor() {
        this.name = '';
        this.type = '';
        this.ownerId = 0;
        this.deliveryPerWeek = 0;
        this.branchOfficeList = [];
    }
}