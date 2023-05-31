import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable} from "rxjs";
import { AuthResponse } from "../models/user.class";

@Injectable({
    providedIn: 'root'
})
export class AuthEvent {

    private subject = new BehaviorSubject<AuthResponse>(null!)
    user$: Observable<AuthResponse> = this.subject.asObservable();

    constructor() { }

    changeLoginUser(user) {
        this.subject.next(user)
    }
}