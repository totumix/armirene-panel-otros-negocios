import { Injectable } from "@angular/core";
import { OrderManager } from "../manager/order.manager";
import { Order } from "../models/order.class";
import { BranchOfficeManager } from "../manager/branch-office.manager";

@Injectable({
    providedIn: 'root'
})
export class OrderVm {
    
    constructor(
        private _orderManager: OrderManager,
        private _branchOfficeManager: BranchOfficeManager) { }

    createOrder(data: Order) {
        return this._orderManager.createOrder(data)
    }

    returnBranchOfficeByBusiness() {
        return this._branchOfficeManager.returnBranchOfficeByBusiness()
    }
}