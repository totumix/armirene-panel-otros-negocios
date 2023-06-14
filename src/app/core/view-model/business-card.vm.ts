import { Injectable } from "@angular/core";
import { BusinessManager } from "../manager/business.manager";
import { BranchOfficeManager } from "../manager/branch-office.manager";

@Injectable({
    providedIn: 'root'
})
export class BusinessCardVm {

    constructor(
        private _businessManager: BusinessManager,
        private _branchOfficeManager: BranchOfficeManager
    ) {
    }

    deleteBusiness(businessId: number) {
        return this._businessManager.deleteBusiness(businessId)
    }

    getBranchOfficeByBusiness(businessId: number) {
        return this._branchOfficeManager.getBranchOfficeByBusiness(businessId)
    }

}