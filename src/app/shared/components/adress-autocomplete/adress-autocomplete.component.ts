import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { saveLatLng } from 'src/app/ngrx/actions/map.actions';
import { AppState } from 'src/app/ngrx/reducers/app.reducer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-adress-autocomplete',
  templateUrl: './adress-autocomplete.component.html',
  styleUrls: ['./adress-autocomplete.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    GooglePlaceModule,
    ReactiveFormsModule
  ]
})
export class AdressAutocompleteComponent {
  center;
  defaultBounds;
  options;
  formattedAddress;
  @Input() parentForm: any;

  constructor(private _store: Store<AppState>) {
    this._store.select('map').subscribe(res => {
      let { latLng, latLng: { lat, lng } } = res;
      this.center = { lat, lng };
      this.defaultBounds = {
        north: this.center.lat + 0.1,
        south: this.center.lat - 0.1,
        east: this.center.lng + 0.1,
        west: this.center.lng - 0.1,
      }
      this.options = {
        componentRestrictions: {
          country: [environment.indicator],
        },
        bounds: this.defaultBounds,
        types: ['geocode'],
      }
    })
  }

  public handleAddressChange(address: any) {
    this.parentForm.get('address').setValue(address.formatted_address)
    var latLng = { lat: address.geometry.location.lat(), lng: address.geometry.location.lng() };
    this._store.dispatch(saveLatLng({ latLng }))
  }
}
