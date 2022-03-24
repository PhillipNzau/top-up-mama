import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../_services/users/users.service";
import {FormBuilder, Validators} from "@angular/forms";
import {NotificationService} from "../../_services/notifications/notification.service";
import {LoadingHandler} from "../../_helpers/loading-handler";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
  // loading
  loadingHandler = new LoadingHandler();

  allListedUsers: any
  selectedUserId: any

  // Pagination vars
  itemsPerPage: any;
  currentPage: any;
  nextPage: any;
  prevPage: any;
  totalPages: any;
  lastPage: any;
  defaultPerPage = 6
  pageNumbers: any;
  itemsListNumber: number[] = [];

  // Res msg
  errorMessage = '';
  successMsg= ''

  userName = '';
  jobTitle = '';

  //Create user form
  addUserForm = this.fb.group({
    name:['', [Validators.required]],
    job:['', [Validators.required]]
  })

  // Update user form
  updateUserForm = this.fb.group({
    name:['',[Validators.required]],
    job:['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private notifyService: NotificationService,
    ) {
  }

  ngOnInit(): void {
    this.fetchAllUser(1, this.defaultPerPage)
  }

  // List all users
  fetchAllUser(page: number, page_size: number) {
    this.loadingHandler.start();
    // List users
    this.userService.listUsers(page, page_size).subscribe({
      next: data => {
        this.loadingHandler.finish();
        this.notifyService.showSuccess("Users retrieved successfully", "TopUpMama")
        this.allListedUsers = data.data
        this.currentPage = data.page
        this.totalPages = data.total_pages
        this.itemsListNumber = data.per_page
        this.pageNumbers = Array.from({length: this.totalPages}, (val, ind) => ind + 1)
      },
      error: err => {
        this.notifyService.showError("Mmh.. Something went wrong.", "TopUpMama")
        this.errorMessage = err.error.error
        // console.log(this.errorMessage)
      }
    })
  }

  // Navigation from pagination
  toSelectedPage(page: any) {
    this.fetchAllUser(page, this.defaultPerPage)
  }

  toPreviousPage() {
    this.prevPage = this.currentPage - 1
    this.fetchAllUser(this.prevPage, this.defaultPerPage)
  }

  toNextPage() {
    this.nextPage = this.currentPage + 1
    this.fetchAllUser(this.nextPage, this.defaultPerPage)
  }

  // Create user function
  addUserSubmit() {
    this.loadingHandler.start();
    this.userService.createUser(this.addUserForm.value).subscribe({
      next: (addUser: any) => {
        this.loadingHandler.finish();
        this.notifyService.showSuccess("Users created successfully", "TopUpMama")
        this.addUserForm.reset()

        console.log('Add user success: ', addUser)
      },
      error: (err: { error: { error: string; }; }) => {
        this.notifyService.showError("Mmh.. Something went wrong creating user.", "TopUpMama")

        console.log('Add user error: ', err)
      }
    })
  }

  // List selected user details
  selectedUser(id:number) {
    this.loadingHandler.start();

    this.userService.viewUser(id).subscribe({
      next: (listSelectedUser:any) => {
        this.loadingHandler.finish();

        this.selectedUserId = id
        this.userName = listSelectedUser.data.first_name
        this.jobTitle = listSelectedUser.data.last_name

        console.log('List selected user success: ', listSelectedUser)

        // set fetched user form details
        let fetchedUser = {
          name: this.userName,
          job: this.jobTitle,
        };
        this.updateUserForm.setValue(fetchedUser);
      },
      error: (err:any) =>{
        console.log('List selected user error: ', err)
      }
    })
  }

  // Delete user by ID
  deleteUserId(id:number) {
    this.loadingHandler.start();

    this.userService.deleteUser(id).subscribe({
      next: (deleteUser: any) => {
        this.loadingHandler.finish();
        this.notifyService.showSuccess("Users deleted successfully", "TopUpMama")

        console.log('Deleted user success: ', deleteUser)
      },
      error: (err: any)=>{
        this.loadingHandler.finish();
        this.notifyService.showError("Mmh.. Something went wrong deleting user.", "TopUpMama")

        console.log('Deleted user error:', err)
      }
    })
  }

  // Update user details
  updateSelectedUser() {
    this.loadingHandler.start();

    this.userService.updateUser(this.updateUserForm.value,this.selectedUserId).subscribe({
      next: (updatedUserDetails:any) =>{
        this.loadingHandler.finish();
        this.notifyService.showSuccess("Users updated successfully", "TopUpMama")

        console.log('Updated User details success: ', updatedUserDetails)
      },
      error: (err:any) => {
        this.notifyService.showError("Mmh.. Something went wrong updating user.", "TopUpMama")

        console.log('Updated User details error: ' , err)
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
