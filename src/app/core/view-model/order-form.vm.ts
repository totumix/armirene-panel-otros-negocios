import { Injectable } from "@angular/core";
import { OrderManager } from "../manager/order.manager";
import { Order } from "../models/order.class";

@Injectable({
    providedIn: 'root'
})
export class OrderVm {
    constructor(private _orderManager: OrderManager) { }

    createOrder(data: Order) {
        return this._orderManager.createOrder(data)
    }
}