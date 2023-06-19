import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, throwError } from 'rxjs';
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
  showActions: boolean = true;
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

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    if (this.validClientForm && this.current != 2) {
      this.current += 1;
      this.changeContent();
    }
    if (this.validOrderForm && this.current == 2) {
      this.current += 1;
      this.changeContent();
    }
  }

  get validClientForm() {
    return !this._orderForm.baseForm.get('client_info')?.invalid;
  }

  get validOrderForm() {
    return !this._orderForm.baseForm.invalid;
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
    if (!this._orderForm.baseForm.invalid) {
      this._vm.createOrder(this._orderForm.baseForm.value)
        .pipe(
          catchError(err => {
            let { error: { message } } = err;
            this._messagesService.showErrors(message);
            return throwError(() => err);
          }),
        ).subscribe(res => {
          let { message } = res;
          this.showActions = false;
          this._messagesService.showErrors(message);
        })
    } else {
      this.showFormError(this._orderForm.baseForm);
    }
  }

  showFormError(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  changeBranchOffice(branchOffice) {
    let { value } = this._orderForm.baseForm.controls['products']
    value.forEach(element => {
      element.store_id = branchOffice.id
    });
  }

  getCoordinates(coordinates) {
    let { lat, lng } = coordinates
    this._orderForm.baseForm.controls['client_info']?.get('lat')?.setValue(lat);
    this._orderForm.baseForm.controls['client_info']?.get('lng')?.setValue(lng);
    let { value: { city } } = this._orderForm.baseForm.controls['client_info'];
    this._orderForm.baseForm.get('city')?.setValue(city);
  }
}
