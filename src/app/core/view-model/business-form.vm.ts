import { Injectable } from "@angular/core";
import { BusinessManager } from "../manager/business.manager";
import { Business } from "../models/business.class";

@Injectable({
    providedIn: 'root'
})
export class BusinessFormVm {

    constructor(private _businessManager: BusinessManager) { }

    saveBusiness(data: Business) {
        return this._businessManager.saveBusiness(data)
    }

    updateBusiness(data: Business) {
        return this._businessManager.updateBusiness(data.id, data)
    }

    getBusinessById(businessId: number) {
        return this._businessManager.getBusinessById(businessId)
    }
}