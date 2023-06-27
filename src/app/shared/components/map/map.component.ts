import { Component, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { selectDataMapInterface } from '../../interfaces/select-data-map.type';
import { ViewportMap } from '../view-port-map/view-port-map';
import { fromFetch } from 'rxjs/fetch';
import { from, switchMap } from 'rxjs';
import { AppState } from 'src/app/ngrx/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { saveLatLng } from 'src/app/ngrx/actions/map.actions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,

})
export class MapComponent implements OnInit, OnDestroy {
  @Output() sendLatLng = new EventEmitter<any>();
  map = ViewportMap.getInstance();
  @Input() selectedData: selectDataMapInterface;
  onGPS = false;

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {

    this._store.select('map').subscribe(res => {
      let { latLng, latLng: { lat, lng } } = res;
      if (lat) {
        this.selectedData.lat = lat;
        this.selectedData.lng = lng;
        this.map?.setView({ lat, lng }, 12);
        this.resolveCoordinatesToAddress({ lat, lng });
        this.map.moveMarker({ lat, lng }, 15)
      }
    })

    this.map.callbackDrop = (data) => {
      this.selectedData.lat = data?.lat;
      this.selectedData.lng = data?.lng;
      this.resolveCoordinatesToAddress(this.selectedData);
    }
    setTimeout(() => { this.getCurrentLocation(); }, 5);
    if (this.selectedData.lat > 0) {
      this.map.init({ lat: this.selectedData.lat, lng: this.selectedData.lng })
    }
  }

  getCurrentLocation() {
    //console.clear();
    navigator.geolocation.getCurrentPosition((position) => {
      if (this.selectedData.lat == 0) {
        this.onGPS = true;
        this.selectedData = { ...this.selectedData, lat: position.coords.latitude, lng: position.coords.longitude }
        this.map.init({ lat: position.coords.latitude, lng: position.coords.longitude })
        this.selectedData.lat = position.coords.latitude;
        this.selectedData.lng = position.coords.longitude;
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
        let coordinates = {
          lat: Number(JSON.parse(JSON.stringify(json)).lat),
          lng: Number(JSON.parse(JSON.stringify(json)).lon)
        }
        this.sendLatLng.emit(coordinates);
      }, (error) => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.onGPS = false;
    let latLng = { lat: 0, lng: 0 };
    this._store.dispatch(saveLatLng({ latLng }))
  }
}
