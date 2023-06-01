import { Injectable } from "@angular/core";
import { BusinessManager } from "../manager/business.manager";
import { Business } from "../models/business.class";

@Injectable({
    providedIn: 'root'
})
export class EnterpriseVm {

    constructor(private _businessManager: BusinessManager) { }

    createBusiness(data: Business) {
        return this._businessManager.createBusiness(data)
    }

}