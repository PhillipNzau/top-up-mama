import { Component, OnInit, AfterViewInit } from '@angular/core';
// @ts-ignore
import * as L from 'leaflet';
import {LocationService} from "../../_services/location/location.service";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  // @ts-ignore
  private map;

  lat:any
  lng:any

  private initMap(): void {
    this.map = L.map('map', {
      center: [ this.lat, this.lng ],
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
  constructor(private locationService: LocationService) { }
  ngOnInit(): void {

    this.locationService.getPosition().then(pos=>
    {
      this.lat = pos.lat
      this.lng = pos.lng

    });

    // this.locationService.getLocation(this.lat,this.lng).subscribe((address:any)=> {
    //   console.log(address)
    // })
  }

  ngAfterViewInit(): void {

    this.locationService.getPosition().then(pos=>
    {
      this.lat = pos.lat
      this.lng = pos.lng
      this.initMap();
    });
  }

}
