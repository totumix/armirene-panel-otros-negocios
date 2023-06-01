import { Component, OnInit } from '@angular/core';
import { BaseFormBusinessService } from 'src/app/core/baseForm/base-form-business.service';
import { EnterpriseVm } from 'src/app/core/view-model/enterprise.vm';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.scss'],
  providers : [BaseFormBusinessService]
})
export class EnterpriseComponent implements OnInit {

  constructor(
    private _vm: EnterpriseVm,
    public _businessForm : BaseFormBusinessService
    ) { }

  ngOnInit(): void {
  }

  submitForm(){
    console.log(this._businessForm.baseForm.value)
  }
}
