import { Injectable } from "@angular/core";
import { shareReplay, switchMap, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AuthResponse } from "../models/auth-response.class";
import { Storage } from "../storage";
import { AuthEvent } from "../events/auth.event";
import { Router } from "@angular/router";

const AUTH_DATA = 'auth_data'
const USER_DATA = 'user_data'

@Injectable({
    providedIn: 'root'
})

export class AuthManager {
    constructor(
        private _authService: AuthService,
        private _authEvent: AuthEvent,
        private _router: Router) { }

    login(formValue) {
        this._authService.login(formValue).pipe(
            tap((authResponse: AuthResponse) => {
                let { data } = authResponse;
                Storage.setAll(AUTH_DATA, data);
                this._authEvent.changeLoginUser(authResponse);
            }),
            switchMap(auth => this._authService.getInfo(formValue.username)),
            shareReplay()
        ).subscribe((user: AuthResponse) => {
            let { data } = user;
            Storage.setAll(USER_DATA, data);
            this._router.navigateByUrl("/start-view/list")
        })
    }

    logout() {
        this._authEvent.changeLoginUser(null!)
        Storage.clear();
        this._router.navigateByUrl("/authentication/login")
    }
}