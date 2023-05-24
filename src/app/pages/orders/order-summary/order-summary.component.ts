import { Component, OnInit } from '@angular/core';
import { OrderFormComponent } from '../order-form/order-form.component';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  constructor(public orderFormComponent: OrderFormComponent,
    private drawerEvent: DrawerEvent) { }

  ngOnInit(): void {
  }

  clickClientDetail() {
    this.orderFormComponent.current = 0;
    this.orderFormComponent.firstContent = true;
    this.orderFormComponent.secondContent = false;
    this.orderFormComponent.thirdContent = false;
    this.orderFormComponent.fourthContent = false;
    this.drawerEvent.changeWidthComponent({ width: '40%' })
  }

  clickOrderDetail() {
    this.orderFormComponent.current = 2;
    this.orderFormComponent.firstContent = false;
    this.orderFormComponent.secondContent = false;
    this.orderFormComponent.thirdContent = true;
    this.orderFormComponent.fourthContent = false;
    this.drawerEvent.changeWidthComponent({ width: '40%' })
  }



}
