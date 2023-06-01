import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartViewRoutingModule } from './start-view-routing.module';
import { BranchOfficeCardModule } from 'src/app/shared/components/branch-office-card/branch-office-card.module';
import { StartViewComponent } from './start-view.component';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { BranchOfficeFormComponent } from '../../shared/components/branch-office-form/branch-office-form.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

const antdModule = [
  NzModalModule
]

@NgModule({
  declarations: [
    StartViewComponent,
  ],
  imports: [
    CommonModule,
    BranchOfficeFormComponent,
    StartViewRoutingModule,
    BranchOfficeCardModule,
    ButtonModule,
    ...antdModule
  ]
})
export class StartViewModule { }
