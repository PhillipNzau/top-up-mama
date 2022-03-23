// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const usersBaseUrl = 'https://reqres.in/api/';
const geoCoderUrl = 'https://nominatim.openstreetmap.org/'
export const environment = {
  production: false,

  // Create , Update, Delete, List Users
  userCreate: usersBaseUrl + 'users',
  userUpdateDelete: usersBaseUrl + 'users/',
  userList: usersBaseUrl + 'users',

  // Get location
  userLocation: geoCoderUrl + 'reverse'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
