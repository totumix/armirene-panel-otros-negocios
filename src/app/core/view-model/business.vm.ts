import { Injectable } from "@angular/core";
import { BranchOfficeManager } from "../manager/branch-office.manager";
import { BusinessManager } from "../manager/business.manager";

@Injectable({
    providedIn: 'root'
})
export class BusinessVm {

    constructor(
        private _businessManager: BusinessManager
    ) {
    }

    returnBranchOfficeByBusiness() {
        return this._businessManager.returnBusiness()
    }

}