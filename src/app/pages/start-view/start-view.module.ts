import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartViewRoutingModule } from './start-view-routing.module';
import { BranchOfficeCardModule } from 'src/app/shared/components/branch-office-card/branch-office-card.module';
import { StartViewComponent } from './start-view.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { BranchOfficeFormComponent } from './branch-office-form/branch-office-form.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PhoneModule } from 'src/app/shared/components/phone/phone.module';

const antdModule = [
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzModalModule
]

@NgModule({
  declarations: [
    StartViewComponent,
    BranchOfficeFormComponent
  ],
  imports: [
    CommonModule,
    StartViewRoutingModule,
    BranchOfficeCardModule,
    ButtonModule,
    ReactiveFormsModule,
    PhoneModule,
    ...antdModule
  ]
})
export class StartViewModule { }
