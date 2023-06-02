import { Injectable } from "@angular/core";
import { OrderService } from "src/app/services/order.service";
import { Order } from "../models/order.class";

@Injectable({
    providedIn: 'root'
})
export class OrderManager {

    constructor(private _orderService: OrderService) { }

    createOrder(data: Order) {
        return this._orderService.createOrder(data);
    }

}