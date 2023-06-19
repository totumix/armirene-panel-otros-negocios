import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Order } from "../models/order.class";
import { BUSINESS_DATA, Storage } from "../storage";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class BaseFormOrderService {
    public baseForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.baseForm = this.fb.group({
            business_id: [Storage.getAll(BUSINESS_DATA).id],
            business_order_id: [0],
            total_value: [0],
            user_tip: [0],
            incentive_value: [0],
            delivery_value: [0],
            vehicle_type: [null, Validators.required],
            payment_method: [null, Validators.required],
            city: [null, Validators.required],
            instructions: [null],
            products: this.fb.array([{
                product_id: 0,
                name: 'demo product',
                description: 'producto demo creado para la prueba de otros negocios',
                quantity: 0,
                image_url: null,
                unit_price: 0,
                store_id: null
            }]),
            client_info: this.fb.group({
                first_name: [null, Validators.required],
                last_name: [null, Validators.required],
                phone: [null, Validators.required],
                email: [null, Validators.required],
                address: [null, Validators.required],
                lat: [null],
                lng: [null],
                city: [null, Validators.required],
                state: [null, Validators.required]
            }),
            country: [environment.indicator],
            token: [0]
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