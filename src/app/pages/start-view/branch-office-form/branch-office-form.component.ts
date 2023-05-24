import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ViewportMap } from 'src/app/shared/components/view-port-map/view-port-map';
import { BranchOffice } from 'src/app/shared/interfaces/branch-office.type';
import { selectDataMapInterface } from 'src/app/shared/interfaces/select-data-map.type';
import { fromFetch } from 'rxjs/fetch';
import { from, switchMap } from 'rxjs';

@Component({
  selector: 'app-branch-office-form',
  templateUrl: './branch-office-form.component.html',
  styleUrls: ['./branch-office-form.component.scss'],
  providers: [NzModalService]
})
export class BranchOfficeFormComponent implements OnInit, AfterViewInit {

  @Input() dataForm: BranchOffice;
  map = ViewportMap.getInstance();
  selectedData: selectDataMapInterface;
  onGPS = false;


  constructor(private modal: NzModalService) { }

  ngOnInit(): void {
    this.map.callbackDrop = (data) => {
      this.selectedData.lat = data?.lat;
      this.selectedData.lng = data?.lng;
      this.resolveCoordinatesToAddress(this.selectedData);
    }
    setTimeout(() => { this.getCurrentLocation(); }, 5);

    // this.map.init({ lat: 4.68234, lng: -74.043835 })
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
