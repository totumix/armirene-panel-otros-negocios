import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AuthResponse } from "../core/models/auth-response.class";
import { business } from "../core/networking/business.api";
import { Business } from "../core/models/business.class";

@Injectable({
    providedIn: 'root'
})
export class BusinessService {

    private url: string;
    constructor(
        private _baseService: BaseService,
    ) {
        this.url = environment.gateway;
    }

    createBusiness(data: Business): Observable<any> {
        return this._baseService.post(`${this.url}/${business.business}/${business.create}`, data)
    }
}