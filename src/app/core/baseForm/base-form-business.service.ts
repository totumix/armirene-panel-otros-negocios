import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Business } from "../models/business.class";
import { BranchOffice } from "../models/branch-office.class";
import { USER_DATA, Storage } from "../storage";

@Injectable()
export class BaseFormBusinessService {
    public baseForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.baseForm = this.fb.group({
            id: [],
            name: [null],
            type: [null],
            ownerId: [Storage.getOne(USER_DATA).id],
            deliveryPerWeek: [null],
            branchOfficeList: this.fb.array([]),
        });
    }

    public pathFormData(business: Business): void {
        this.baseForm.patchValue({
            ...business
        });
    }

    resetForm() {
        this.baseForm.reset();
    }

    get branchOfficeList(): FormArray {
        return this.baseForm.get('branchOfficeList') as FormArray;
    }

    getBranchOfficeFormGroup(branchOffice: BranchOffice): FormGroup {
        return this.fb.group({
            ...branchOffice
        });
    }

    addBranchOffice() {
        const branchOfficeGroup = this.getBranchOfficeFormGroup(new BranchOffice);
        this.branchOfficeList.push(this.getBranchOfficeFormGroup(new BranchOffice));
        this.baseForm.markAsDirty();
        return branchOfficeGroup;
    }
}