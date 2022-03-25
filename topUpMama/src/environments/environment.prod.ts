const usersBaseUrl = 'https://reqres.in/api/';
const geoCoderUrl = 'https://nominatim.openstreetmap.org/'

export const environment = {
  production: true,

  // Login Register
  loginUser: usersBaseUrl + 'login',
  registerUser: usersBaseUrl + 'register',

  // Create , Update, Delete, List Users
  userCreate: usersBaseUrl + 'users',
  userUpdateDelete: usersBaseUrl + 'users/',
  userList: usersBaseUrl + 'users',

  // Get location
  userLocation: geoCoderUrl + 'reverse'
};
