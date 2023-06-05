import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BranchOffice } from 'src/app/core/models/branch-office.class';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PhoneModule } from 'src/app/shared/components/phone/phone.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BaseFormBusinessService } from 'src/app/core/baseForm/base-form-business.service';
import { CommonModule } from '@angular/common';
import { MapComponent } from '../map/map.component';

const MODULES = [
  ButtonModule,
  ReactiveFormsModule,
  NzFormModule,
  PhoneModule,
  NzInputModule,
  NzSelectModule,
  CommonModule,
  MapComponent
]
@Component({
  selector: 'app-branch-office-form',
  templateUrl: './branch-office-form.component.html',
  styleUrls: ['./branch-office-form.component.scss'],
  standalone: true,
  providers: [NzModalService, BaseFormBusinessService],
  imports: [...MODULES]
})
export class BranchOfficeFormComponent implements OnInit, AfterViewInit {

  @Input() form: FormGroup
  @Input() dataForm: BranchOffice;
  @Input() index : number;
  showDrawerActions: boolean;

  constructor(
    private modal: NzModalService,
    private _branchOfficeForm: BaseFormBusinessService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (!this.form) {
      this.form = this._branchOfficeForm.getBranchOfficeFormGroup(new BranchOffice);
      this.showDrawerActions = true;
    } else {
      this.showDrawerActions = false;
    }
  }

  ngAfterViewInit(): void {
  }

  changeCity(city: any) {
    console.log(city)
  }

  changeMunicipality(municipality: any) {
    console.log(municipality)
  }

  deleteBranchOffice() {
    this.modal.confirm({
      nzTitle: '¿Estás seguro de eliminar esta sucursal?',
      nzContent: 'Si eliminas esta sucursal no podrás recuperarla',
      nzOkText: 'Aceptar',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => console.log('OK', this.dataForm),
      nzCancelText: 'Cancelar',
      nzOnCancel: () => console.log('Cancel')
    });
  }

}
