import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessComponent } from './business.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { BusinessRoutingModule } from './business-routing.module';
import { BusinessCardComponent } from 'src/app/shared/components/business-card/business-card.component';



@NgModule({
  declarations: [
    BusinessComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    BusinessRoutingModule,
    BusinessCardComponent
  ]
})
export class BusinessModule { }
