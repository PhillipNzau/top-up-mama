import {Component, Inject, OnInit} from '@angular/core';
import {BROWSER_STORAGE} from "../../_helpers/storage";
import {UsersService} from "../../_services/users/users.service";
import {FormBuilder, Validators} from "@angular/forms";
import {LoadingHandler} from "../../_helpers/loading-handler";

@Component({
  selector: 'app-my-account-page',
  templateUrl: './my-account-page.component.html',
  styleUrls: ['./my-account-page.component.scss']
})
export class MyAccountPageComponent implements OnInit {
  // loading
  loadingHandler = new LoadingHandler();

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
    @Inject(BROWSER_STORAGE) public storage: Storage
  ) { }
  getToken(): any {
    return this.storage.getItem('uid');
  }
  ngOnInit(): void {
    this.userId = this.getToken()
    this.fetLoggedInUser()
  }

  fetLoggedInUser() {
    this.loadingHandler.start();
    this.userService.viewUser(this.userId).subscribe({
      next: (loggedUser:any) =>{
        this.loadingHandler.finish();
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
        console.log('Fetched Logged user err: ', err)
      }
    })

  }

  updateLoggedUserSubmit() {
    this.userService.updateUser(this.updateLoggedUserForm.value, this.userId).subscribe({
      next: (data:any) =>{
        console.log('Update logged in user: ', data)

      },
      error: (err:any)=>{

      }
    })

  }
}
