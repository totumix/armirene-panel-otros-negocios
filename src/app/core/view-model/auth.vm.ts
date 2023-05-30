import { Injectable } from "@angular/core";
import { AuthManager } from "../manager/auth.manager";

@Injectable({
    providedIn: 'root'
})
export class AuthVm {
    constructor(private _authManager: AuthManager) { }

    login(data) {
        return this._authManager.login(data)
    }

}