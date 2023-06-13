import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, shareReplay, tap, throwError } from "rxjs";
import { BranchOfficeService } from "src/app/services/branch-office.service";
import { BranchOffice } from "../models/branch-office.class";
import { MessagesService } from "src/app/services/messages.service";
import { LoadingService } from "src/app/services/loading.service";
import { CitiesServices } from "src/app/services/cities.service";

@Injectable({
    providedIn: 'root'
})
export class BranchOfficeManager {

    private subject = new BehaviorSubject<BranchOffice[]>([]);
    branchOffices$: Observable<BranchOffice[]> = this.subject.asObservable();


    constructor(
        private _branchOfficeService: BranchOfficeService,
        private _messages: MessagesService,
        private _loading: LoadingService,
        private _citiesService: CitiesServices
    ) {
        this.getBranchOfficeByBusiness(19);
    }

    private getBranchOfficeByBusiness(businessId: number) {
        const loadBranchOfficeByBusiness$ = this._branchOfficeService.getBranchOfficeByBusiness(businessId).pipe(
            catchError(err => {
                const message = "Could not load branch offices";
                this._messages.showErrors(message);
                console.log(message, err);
                return throwError(() => err);
            }),
            tap(branchOffices => this.subject.next(branchOffices)),
            shareReplay()
        );

        this._loading.showLoaderUntilCompleted(loadBranchOfficeByBusiness$)
            .subscribe();
    }

    returnBranchOfficeByBusiness(): Observable<BranchOffice[]> {
        return this.branchOffices$
    }

    saveBranchOfficeByBusiness(body: BranchOffice) {
        const branchOffices = this.subject.getValue();
        return this._branchOfficeService.saveBranchOfficeByBusiness(body).pipe(
            tap(branchOffice => {
                branchOffices.push(branchOffice);
                this.subject.next(branchOffices);
            }),
            shareReplay()
        )
    }

    deleteBranchOfficeByBusiness({ id, businessOwner }) {
        const body = {
            branchOfficeId: id,
            businessOwnerId: businessOwner
        }
        const branchOffices = this.subject.getValue();
        const index = branchOffices.findIndex(branchOffice => branchOffice.id == body.branchOfficeId);
        branchOffices.splice(index, 1);
        this.subject.next(branchOffices);
        return this._branchOfficeService.deleteBranchOfficeByBusiness(body).pipe(
            catchError(err => {
                const message = "Could not delete branch office";
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            shareReplay()
        )
    }

    updateBranchOffice(branchOfficeId, businessId, changes: BranchOffice) {
        const branchOffices = this.subject.getValue();
        const index = branchOffices.findIndex(branchOffice => branchOffice.id == branchOfficeId);
        const newBranchOffice: BranchOffice = {
            ...branchOffices[index],
            ...changes
        };
        const newBranchOffices: BranchOffice[] = branchOffices.slice(0);
        newBranchOffices[index] = newBranchOffice;
        this.subject.next(newBranchOffices);
        return this._branchOfficeService.updateBranchOffice(branchOfficeId, businessId, changes).pipe(
            catchError(err => {
                const message = "Could not update branch office";
                this._messages.showErrors(message);
                return throwError(() => err);
            }),
            shareReplay()
        )
    }

    getCities(stateId) {
        return this._citiesService.getCities(stateId)
    }
}