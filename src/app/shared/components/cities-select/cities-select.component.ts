import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { STATES, Storage } from 'src/app/core/storage';
import { CitiesSelectVM } from 'src/app/core/view-model/cities-select.vm';
const MODULES = [
  ReactiveFormsModule,
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  CommonModule,
]
@Component({
  selector: 'app-cities-select',
  templateUrl: './cities-select.component.html',
  styleUrls: ['./cities-select.component.scss'],
  standalone: true,
  imports: [...MODULES]
})
export class CitiesSelectComponent implements OnInit {
  @Input() parentForm: any;
  states = Storage.getAll(STATES);
  public cities = new Array;

  constructor(private _vm: CitiesSelectVM) { }

  ngOnInit() {
    this.uploadCities();
  }

  uploadCities() {
    let state = this.parentForm.controls['state'].value;
    if (state) {
      this.changeState(this.parentForm.controls['state'].value)
    }
  }

  changeState(stateName: string) {
    let stateId = this.states.filter(state => state.name == stateName)[0].id;
    this._vm.getCities(stateId).subscribe(cities => this.cities = cities)
  }

  changeMunicipality(city: string) {
    console.log(city)
  }
}
