import { Injectable } from "@angular/core";
import { BusinessService } from "src/app/services/business.service";
import { Business } from "../models/business.class";
import { BehaviorSubject, Observable, catchError, shareReplay, tap, throwError } from "rxjs";
import { LoadingService } from "src/app/services/loading.service";
import { MessagesService } from "src/app/services/messages.service";
import { Storage, USER_DATA } from "../storage";

@Injectable({
    providedIn: 'root'
})
export class BusinessManager {

    private subject = new BehaviorSubject<Business[]>([]);
    business$: Observable<Business[]> = this.subject.asObservable();

    constructor(
        private _businessService: BusinessService,
        private _messages: MessagesService,
        private _loading: LoadingService,
    ) {
        this.getBusiness(Storage.getOne(USER_DATA).id);
    }

    createBusiness(data: Business) {
        return this._businessService.saveBusiness(data);
    }

    private getBusiness(userId: number) {
        const loadBusiness$ = this._businessService.getBusiness(userId).pipe(
            catchError(err => {
                const message = "Could not load business";
                this._messages.showErrors(message);
                console.log(message, err);
                return throwError(() => err);
            }),
            tap(businessList => this.subject.next(businessList)),
            shareReplay()
        );

        this._loading.showLoaderUntilCompleted(loadBusiness$)
            .subscribe();
    }

    returnBusiness(): Observable<Business[]> {
        return this.business$
    }

    saveBranchOfficeByBusiness(body: Business) {
        const businessList = this.subject.getValue();
        return this._businessService.saveBusiness(body).pipe(
            tap(business => {
                businessList.push(business);
                this.subject.next(businessList);
            }),
            shareReplay()
        )
    }

    deleteBranchOfficeByBusiness(businessId) {
        const businessList = this.subject.getValue();
        const index = businessList.findIndex(business => business.id == businessId);
        businessList.splice(index, 1);
        this.subject.next(businessList);
        return this._businessService.deleteBusiness(businessId).pipe(
            catchError(err => {
                const message = "Could not delete branch office";
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            shareReplay()
        )
    }

    // updateBranchOffice(branchOfficeId, businessId, changes: Business) {
    //     const branchOffices = this.subject.getValue();
    //     const index = branchOffices.findIndex(branchOffice => branchOffice.id == branchOfficeId);
    //     const newBranchOffice: Business = {
    //         ...branchOffices[index],
    //         ...changes
    //     };
    //     const newBranchOffices: Business[] = branchOffices.slice(0);
    //     newBranchOffices[index] = newBranchOffice;
    //     this.subject.next(newBranchOffices);
    //     return this._businessService.updateBusiness(branchOfficeId, businessId, changes).pipe(
    //         catchError(err => {
    //             const message = "Could not update branch office";
    //             this._messages.showErrors(message);
    //             return throwError(() => err);
    //         }),
    //         shareReplay()
    //     )

    // }

}