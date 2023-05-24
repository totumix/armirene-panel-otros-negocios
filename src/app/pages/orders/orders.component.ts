import { Component, OnInit } from '@angular/core';
import { OrderFormComponent } from './order-form/order-form.component';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor(private drawerEvent : DrawerEvent) { }

  ngOnInit(): void {
  }

  createOrder() {
    this.drawerEvent.changeOpenComponent({component : OrderFormComponent })
  }
}
