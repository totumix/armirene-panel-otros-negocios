import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { catchError, finalize, throwError } from 'rxjs';
import { BaseFormBusinessService } from 'src/app/core/baseForm/base-form-business.service';
import { TEMPORAL_BUSINESS_QUANTITY, TEMPORAL_BUSINESS_TYPE } from 'src/app/core/storage';
import { EnterpriseVm } from 'src/app/core/view-model/enterprise.vm';
import { LoadingService } from 'src/app/services/loading.service';
import { MessagesService } from 'src/app/services/messages.service';
@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.scss'],
  providers: [
    BaseFormBusinessService,
    MessagesService
  ]
})
export class EnterpriseComponent implements OnInit {

  public businessTypes = TEMPORAL_BUSINESS_TYPE;
  public businessQuantityList = TEMPORAL_BUSINESS_QUANTITY;
  public businessQuantity: number;
  constructor(
    private _vm: EnterpriseVm,
    public _businessForm: BaseFormBusinessService,
    private _loadingService: LoadingService,
    private _messagesService: MessagesService
  ) { }

  ngOnInit(): void {
  }

  submitForm() {
    let { baseForm: { value } } = this._businessForm;
    this._vm.createBusiness(value)
      .pipe(
        finalize(() => this._loadingService.loadingOff()),
        catchError(err => {
          let { error: { message } } = err;
          this._messagesService.showErrors(message ? message : 'Error en la petición');
          return throwError(() => err);
        }),
      )
      .subscribe(res => {
        console.log(res)
      })
  }

  onChangeBusinessQuantity(quantity) {
    if (this.businessQuantity) {
      const arr = <FormArray>this._businessForm.baseForm.controls['branchOfficeList'];
      arr.controls = [];
    }
    this.businessQuantity = quantity;
    for (let i = 0; i < this.businessQuantity; i++) {
      this._businessForm.addBranchOffice();
    }
  }
}
