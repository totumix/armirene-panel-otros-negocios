import { Injectable } from "@angular/core";
import { BusinessService } from "src/app/services/business.service";
import { Business } from "../models/business.class";

@Injectable({
    providedIn: 'root'
})
export class BusinessManager {

    constructor(private _businessService: BusinessService) { }

    createBusiness(data: Business) {
        return this._businessService.createBusiness(data);
    }

}