import { Injectable } from "@angular/core";
import { OrderManager } from "../manager/order.manager";
import { map } from "rxjs";
import { order } from "../networking/order.api";

@Injectable({
    providedIn: 'root'
})
export class OrdersVm {

    constructor(
        private _orderManager: OrderManager
    ) { }

    returnOrderByBusiness() {
        return this._orderManager.returnOrderByBusiness().pipe(
            map(orders => orders.map(order => {
                order.business_id = order.businessId,
                    order.country = order.country,
                    order.token = order.token,
                    order.state = order.state,
                    order.business_order_id = order.businessOrderId,
                    order.total_value = order.totalValue,
                    order.user_tip = order.userTip,
                    order.incentive_value = order.incentiveValue,
                    order.delivery_value = order.deliveryValue,
                    order.vehicle_type = order.vehicleTypeId,
                    order.payment_method = order.paymentMethodId,
                    order.instructions = order.instructions,
                    order.products = order.businessId,
                    order.client_info = {
                        first_name: order.clientFirstName,
                        last_name: order.clientLastName,
                        phone: order.clientPhone,
                        email: order.clientEmail,
                        address: order.clientAddress,
                        lat: order.clientLat,
                        lng: order.clientLng,
                        city: order.cityId,
                        state: order.state,
                    }
                return order
            }))
        )
    }
}