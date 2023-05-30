import { Injectable } from "@angular/core";
import { AuthManager } from "../manager/auth.manager";

@Injectable({
    providedIn : 'root'
})
export class DashboardLayoutVm {
    constructor ( private _authManager : AuthManager){}

    logout(){
        this._authManager.logout()
    }
}