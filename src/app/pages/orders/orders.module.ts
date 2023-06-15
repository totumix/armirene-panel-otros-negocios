import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { OrdersComponent } from './orders.component';
import { OdersListComponent } from './oders-list/oders-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PhoneModule } from 'src/app/shared/components/phone/phone.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { OrderTotalComponent } from './order-total/order-total.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitiesSelectComponent } from 'src/app/shared/components/cities-select/cities-select.component';

const antdModule = [
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzIconModule,
  NzStepsModule,
  NzRadioModule
]

@NgModule({
  declarations: [
    OrdersComponent,
    OdersListComponent,
    OrderFormComponent,
    OrderCardComponent,
    OrderTotalComponent,
    OrderSummaryComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    PhoneModule,
    FormsModule,
    CitiesSelectComponent,
    ...antdModule
  ]
})
export class OrdersModule { }
