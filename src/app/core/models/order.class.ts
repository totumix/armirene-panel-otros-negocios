export class Order {
    business_id: number;
    business_order_id: number;
    total_value: number;
    user_tip: number;
    incentive_value: number;
    delivery_value: number;
    vehicle_type: number;
    payment_method: number;
    city: string;
    instructions: string;
    products: Array<any>;
    client_info: Object;
    country: string;
    token: string;
    constructor() {
        this.business_id = 0;
        this.business_order_id = 0;
        this.total_value = 0;
        this.user_tip = 0;
        this.incentive_value = 0;
        this.delivery_value = 0;
        this.vehicle_type = 0;
        this.payment_method = 0;
        this.city = "";
        this.instructions = "";
        this.products = [];
        this.client_info = {};
        this.country = "";
        this.token = "";
    }
}