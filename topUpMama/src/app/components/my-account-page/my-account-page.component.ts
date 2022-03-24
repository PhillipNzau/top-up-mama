import {Component, Inject, OnInit} from '@angular/core';
import {BROWSER_STORAGE} from "../../_helpers/storage";
import {UsersService} from "../../_services/users/users.service";
import {FormBuilder, Validators} from "@angular/forms";
import {LoadingHandler} from "../../_helpers/loading-handler";
import {NotificationService} from "../../_services/notifications/notification.service";

@Component({
  selector: 'app-my-account-page',
  templateUrl: './my-account-page.component.html',
  styleUrls: ['./my-account-page.component.scss']
})
export class MyAccountPageComponent implements OnInit {
  // loading
  loadingHandler = new LoadingHandler();

  // Location
  lat: any
  lng: any
  displayName:any
  city:any
  suburb:any
  region:any
  country:any

  userId: any
  loggedInUser: any
  avatar:any
  firstName:any
  lastName:any
  uEmail:any

  // Update form
  updateLoggedUserForm = this.fb.group({
    name: ['', [Validators.required]],
    job: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private notifyService: NotificationService,
    @Inject(BROWSER_STORAGE) public storage: Storage
  ) { }
  getToken(): any {
    return this.storage.getItem('uid');
  }
  ngOnInit(): void {
    this.userId = this.getToken()
    this.fetLoggedInUser()
    this.getSavedUserLatLocation()
    this.getSavedUserLngLocation()
    this.getUserLocation()
  }

  // get location from local storage
  getSavedUserLatLocation(): any {
    this.lat = this.storage.getItem('lat')
  }

  getSavedUserLngLocation(): any {
    this.lng = this.storage.getItem('lng')
  }

  fetLoggedInUser() {
    this.loadingHandler.start();
    this.userService.viewUser(this.userId).subscribe({
      next: (loggedUser:any) =>{
        this.loadingHandler.finish();
        this.notifyService.showSuccess("User retrieved successfully", "TopUpMama")

        this.loggedInUser = loggedUser.data
        this.avatar = this.loggedInUser.avatar
        this.firstName = this.loggedInUser.first_name
        this.lastName = this.loggedInUser.last_name
        this.uEmail = this.loggedInUser.email

        // set fetched user form details
        let fetchedUser = {
          name: this.firstName ,
          job: this.lastName,
        };
        this.updateLoggedUserForm.setValue(fetchedUser);
        console.log('Fetched Logged user success: ', loggedUser)
      },
      error: (err:any)=>{
        this.notifyService.showError("Mmh.. Something went wrong.", "TopUpMama")

        console.log('Fetched Logged user err: ', err)
      }
    })

  }

  updateLoggedUserSubmit() {
    this.userService.updateUser(this.updateLoggedUserForm.value, this.userId).subscribe({
      next: (data:any) =>{
        this.notifyService.showSuccess("User updated successfully", "TopUpMama")

        console.log('Update logged in user: ', data)

      },
      error: (err:any)=>{
        this.notifyService.showError("Mmh.. Something went wrong.", "TopUpMama")
      }
    })
  }

  // Get user location
  getUserLocation() {
    this.userService.getUserLocation(this.lat, this.lng, 'json').subscribe({
      next: (position: any) => {
        this.city = position.address.city
        this.country = position.address.country
        this.region = position.address.region
        this.suburb = position.address.suburb

        this.displayName = `You Are Currently in: ${this.suburb} , ${this.city} -- ${this.country}`
      },
      error: (err: any) => {

      }
    })
  }

  // check form validity
  isValid(fieldName: any, formName: any): boolean {
    return (
      formName.controls[fieldName].invalid &&
      (formName.controls[fieldName].dirty ||
        formName.controls[fieldName].touched)
    );
  }
}
