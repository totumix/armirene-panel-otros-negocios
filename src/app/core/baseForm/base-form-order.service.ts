import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { Order } from "../models/order.class";
import { BUSINESS_DATA, Storage } from "../storage";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BaseFormOrderService {
    public baseForm: FormGroup;

    constructor(private fb: FormBuilder) { }

    public pathFormData(order: Order): FormGroup {
        let form = this.fb.group({
            ...order,
            client_info: this.fb.group({
                ...order.client_info
            })
        });
        this.setValidators(order.client_info, form.get('client_info') as FormGroup)
        return this.setValidators(order, form)
    }

    setValidators(order: Order, form: FormGroup) {
        Object.keys(order).forEach(key => {
            form.get(key)?.setValidators(Validators.required)
        })
        form.updateValueAndValidity();
        return form
    }

    resetForm() {
        this.baseForm.reset();
    }

    get products(): FormArray {
        return this.baseForm.get('products') as FormArray;
    }

    //esto pasarlo a productos

    //     getBranchOfficeFormGroup(branchOffice: BranchOffice): FormGroup {
    //         return this.fb.group({
    //             ...branchOffice
    //         });
    //     }

    //     addBranchOffice() {
    //         const branchOfficeGroup = this.getBranchOfficeFormGroup(new BranchOffice);
    //         this.products.push(this.getBranchOfficeFormGroup(new BranchOffice));
    //         this.baseForm.markAsDirty();
    //         return branchOfficeGroup;
    //     }
    // 
}