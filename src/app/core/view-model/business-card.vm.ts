import { Injectable } from "@angular/core";
import { BusinessManager } from "../manager/business.manager";

@Injectable({
    providedIn: 'root'
})
export class BusinessCardVm {

    constructor(
        private _businessManager: BusinessManager
    ) {
    }

    deleteBusiness(businessId: number) {
        return this._businessManager.deleteBusiness(businessId)
    }

}