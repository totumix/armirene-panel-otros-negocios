import { Component, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { selectDataMapInterface } from '../../interfaces/select-data-map.type';
import { ViewportMap } from '../view-port-map/view-port-map';
import { fromFetch } from 'rxjs/fetch';
import { from, switchMap } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,

})
export class MapComponent implements OnInit, OnDestroy {
  @Output() sendLatLng = new EventEmitter<any>();
  map = ViewportMap.getInstance();
  selectedData: selectDataMapInterface;
  onGPS = false;

  constructor() { }

  ngOnInit() {
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
  }
}
