import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
// @ts-ignore
import * as L from 'leaflet';
import {LocationService} from "../../_services/location/location.service";
import {UsersService} from "../../_services/users/users.service";
import {BROWSER_STORAGE} from "../../_helpers/storage";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  private map;

  lat: any
  lng: any

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    L.marker([this.lat, this.lng]).addTo(this.map);
    tiles.addTo(this.map);
  }

  constructor(
    @Inject(BROWSER_STORAGE) public storage: Storage
  ) {
  }

  ngOnInit(): void {
    this.getSavedUserLatLocation()
    this.getSavedUserLngLocation()
  }

  // get location from local storage
  getSavedUserLatLocation(): any {
    this.lat = this.storage.getItem('lat')
  }

  getSavedUserLngLocation(): any {
    this.lng = this.storage.getItem('lng')
  }


  ngAfterViewInit(): void {
      this.initMap();
  }

}
