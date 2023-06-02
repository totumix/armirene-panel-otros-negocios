import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Order } from "../models/order.class";

@Injectable({
    providedIn: 'root'
})
export class BaseFormOrderService {
    public baseForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.baseForm = this.fb.group({
            business_id: [null],
            business_order_id: [null],
            total_value: [null],
            user_tip: [null],
            incentive_value: [null],
            delivery_value: [null],
            vehicle_type: [null],
            payment_method: [null],
            city: [null],
            instructions: [null],
            products: this.fb.array([]),
            client_info: this.fb.group({
                first_name: [null],
                last_name: [null],
                phone: [null],
                email: [null],
                address: [null],
                lat: [null],
                lng: [null],
                city: [null],
                municipality: [null]
            }),
            country: [null],
            token: [null]
        });
    }

    public pathFormData(order: Order): void {
        this.baseForm.patchValue({
            ...order
        });
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