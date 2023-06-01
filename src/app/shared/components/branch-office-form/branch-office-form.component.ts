import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ViewportMap } from 'src/app/shared/components/view-port-map/view-port-map';
import { selectDataMapInterface } from 'src/app/shared/interfaces/select-data-map.type';
import { fromFetch } from 'rxjs/fetch';
import { from, switchMap } from 'rxjs';
import { BranchOffice } from 'src/app/core/models/branch-office.class';
import { ButtonModule } from 'src/app/shared/components/button/button.module';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PhoneModule } from 'src/app/shared/components/phone/phone.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BaseFormBusinessService } from 'src/app/core/baseForm/base-form-business.service';
import { BusinessService } from 'src/app/services/business.service';
import { CommonModule } from '@angular/common';

const MODULES = [
  ButtonModule,
  ReactiveFormsModule,
  NzFormModule,
  PhoneModule,
  NzInputModule,
  NzSelectModule,
  CommonModule
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
  map = ViewportMap.getInstance();
  selectedData: selectDataMapInterface;
  onGPS = false;
  showDrawerActions: boolean;

  constructor(
    private modal: NzModalService,
    private _branchOfficeForm: BaseFormBusinessService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
    this.map.callbackDrop = (data) => {
      this.selectedData.lat = data?.lat;
      this.selectedData.lng = data?.lng;
      this.resolveCoordinatesToAddress(this.selectedData);
    }
    setTimeout(() => { this.getCurrentLocation(); }, 5);
    // this.map.init({ lat: 4.68234, lng: -74.043835 })
  }

  initForm() {
    if (!this.form) {
      this.form = this._branchOfficeForm.getBranchOfficeFormGroup(new BranchOffice);
      this.showDrawerActions = true;
    } else {
      this.showDrawerActions = false;
    }
  }

  getCurrentLocation() {
    //console.clear();
    navigator.geolocation.getCurrentPosition((position) => {
      if (!this.selectedData?.address || this.selectedData?.address?.length < 1) {
        this.onGPS = true;
        this.selectedData = { ...this.selectedData, lat: position.coords.latitude, lng: position.coords.longitude }
        this.map.init({ lat: position.coords.latitude, lng: position.coords.longitude })
        // this.selectedData.lat = position.coords.latitude;
        // this.selectedData.lng = position.coords.longitude;
        // this.setPositionMarker();
        this.resolveCoordinatesToAddress(this.selectedData);
      }
    });
  }

  resolveCoordinatesToAddress({ lat, lng }) {
    let urlInver = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&addressdetails=0&zoom=40&lat=';
    urlInver += `&lat=${lat}&lon=${lng}`;
    fromFetch(urlInver)
      .pipe(switchMap((r: any) => from(r.json())))
      .subscribe((json) => {
        console.log(json);
      }, (error) => {
        console.log(error);
      });
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

  ngOnDestroy() {
    this.onGPS = false;
  }
}
