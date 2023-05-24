import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneComponent } from './phone.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

const antdModule = [
  NzFormModule,
  NzInputModule,
  NzSelectModule,
]

@NgModule({
  declarations: [
    PhoneComponent
  ],
  imports: [
    CommonModule,
    ...antdModule
  ],
  exports:[
    PhoneComponent
  ]
})
export class PhoneModule { }
