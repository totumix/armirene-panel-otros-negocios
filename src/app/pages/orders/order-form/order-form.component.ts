import { Component, Input, OnInit } from '@angular/core';
import { Observable, catchError, from, switchMap, throwError } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { BaseFormOrderService } from 'src/app/core/baseForm/base-form-order.service';
import { BranchOffice } from 'src/app/core/models/branch-office.class';
import { OrderVm } from 'src/app/core/view-model/order-form.vm';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { ViewportMap } from 'src/app/shared/components/view-port-map/view-port-map';
import { DrawerEvent } from 'src/app/shared/event-listeners/drawer.event';
import { selectDataMapInterface } from 'src/app/shared/interfaces/select-data-map.type';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  providers: [
    MessagesService
  ]
})
export class OrderFormComponent implements OnInit {

  @Input() dataForm: any;
  branchOfficeList$: Observable<BranchOffice[]>
  branchOfficeSelected: BranchOffice;
  current: number = 0;
  firstContent: boolean = true;
  secondContent: boolean = false;
  thirdContent: boolean = false;
  fourthContent: boolean = false;
  map = ViewportMap.getInstance();
  selectedData: selectDataMapInterface;
  onGPS = false;

  constructor(
    private drawerEvent: DrawerEvent,
    public _orderForm: BaseFormOrderService,
    private _vm: OrderVm,
    private _messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.getBranchOfficeByBusiness();
  }

  getBranchOfficeByBusiness() {
    this.branchOfficeList$ = this._vm.returnBranchOfficeByBusiness()
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
        this._orderForm.baseForm.controls['client_info'].value.lat = Number(JSON.parse(JSON.stringify(json)).lat)
        this._orderForm.baseForm.controls['client_info'].value.lng = Number(JSON.parse(JSON.stringify(json)).lon)
      }, (error) => {
        console.log(error);
      });
  }

  initMap() {
    this.map.callbackDrop = (data) => {
      this.selectedData.lat = data?.lat;
      this.selectedData.lng = data?.lng;
      this.resolveCoordinatesToAddress(this.selectedData);
    }
    setTimeout(() => { this.getCurrentLocation(); }, 5);
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.firstContent = true;
        this.secondContent = false;
        this.thirdContent = false;
        this.fourthContent = false;
        this.drawerEvent.changeWidthComponent({ width: '40%' })
        break;
      }
      case 1: {
        this.initMap();
        this.firstContent = false;
        this.secondContent = true;
        this.thirdContent = false;
        this.fourthContent = false;
        break;
      }
      case 2: {
        this.firstContent = false;
        this.secondContent = false;
        this.thirdContent = true;
        this.fourthContent = false;
        this.drawerEvent.changeWidthComponent({ width: '40%' })
        break;
      }
      case 3: {
        this.firstContent = false;
        this.secondContent = false;
        this.thirdContent = false;
        this.fourthContent = true;
        this.drawerEvent.changeWidthComponent({ width: '90%' })
        break;
      }
      default: {
        console.log("error")
      }
    }
  }

  createOrder() {
    let { value: { city } } = this._orderForm.baseForm.controls['client_info'];
    this._orderForm.baseForm.get('city')?.setValue(city)
    this._vm.createOrder(this._orderForm.baseForm.value)
      .pipe(
        catchError(err => {
          let { error: { message } } = err;
          this._messagesService.showErrors(message);
          return throwError(() => err);
        }),
      ).subscribe(res => {
        let { message } = res;
        this._messagesService.showErrors(message);
      })
  }

  changeBranchOffice(branchOffice) {
    let { value } = this._orderForm.baseForm.controls['products']
    value.forEach(element => {
      element.store_id = branchOffice.id
    });
  }
}
