export class Client {
    id: string;
    name: string;
    document: string;
    email: string;
    address: string;
    phone: string;
    orders: number;
    constructor() {
        this.name = '';
        this.document = '';
        this.email = ''
        this.address = '';
        this.phone = '';
        this.orders = 0;
    }
}