import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  userLocationUrl = environment.userLocation

  constructor(private http:HttpClient) { }

  // Fetch user location
  getLocation(lat:number, lon:number): Observable<any> {
    let params = new HttpParams();
    params = params.append('lat', String(lat))
    params = params.append('lon', String(lon))

    return this.http.get(this.userLocationUrl + '?' + params)
  }


  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
}
