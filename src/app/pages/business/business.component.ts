import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Business } from 'src/app/core/models/business.class';
import { BusinessVm } from 'src/app/core/view-model/business.vm';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent {
  listOfData$: Observable<Business[]>

  constructor(private _vm: BusinessVm) {

  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.getBusiness();
  }

  createBusiness() {
  }

  getBusiness() {
    this.listOfData$ = this._vm.returnBranchOfficeByBusiness()
  }

}
