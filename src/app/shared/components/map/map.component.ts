import { Component, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  @Input() selectedData: selectDataMapInterface;
  onGPS = false;

  constructor() { }

  ngOnInit() {
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
      console.log("position", position, "selected data", this.selectedData)
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
        console.log(coordinates, "coordinates resolve")
        this.sendLatLng.emit(coordinates);
      }, (error) => {
        console.log(error);
      });
  }

  ngOnDestroy() {
    this.onGPS = false;
  }
}
