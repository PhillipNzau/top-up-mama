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
  itemsPerPage: any;
  currentPage: any;
  nextPage: any;
  prevPage: any;
  totalPages: any;
  lastPage: any;
  defaultPerPage = 6
  pageNumbers: any;
  itemsListNumber: number[] = [];
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
      next: (data: any) => {
        this.loadingHandler.finish();
        this.notifyService.showSuccess("Users created successfully", "TopUpMama")
        this.addUserForm.reset()
        console.log(data)
      },
      error: (err: { error: { error: string; }; }) => {
        this.notifyService.showError("Mmh.. Something went wrong creating user.", "TopUpMama")

        // this.errorMessage = err.error.error
        console.log(err)
      }
    })
  }

  // List selected user details
  selectedUser(id:number) {
    this.loadingHandler.start();

    this.userService.viewUser(id).subscribe({
      next: (data:any) => {
        this.loadingHandler.finish();

        console.log(data.data.first_name)
        this.userName = data.data.first_name
        this.jobTitle = data.data.last_name
        console.log(this.jobTitle)

        // set fetched user form details
        let fetchedUser = {
          name: this.userName,
          job: this.jobTitle,
        };
        this.updateUserForm.setValue(fetchedUser);
        console.log('The form ', this.updateUserForm.value)
      },
      error: (err:any) =>{

      }
    })
  }

  // Delete user by ID
  deleteUserId(id:number) {
    this.loadingHandler.start();

    this.userService.deleteUser(id).subscribe({
      next: (data: any) => {
        this.loadingHandler.finish();
        this.notifyService.showSuccess("Users deleted successfully", "TopUpMama")
      },
      error: (err: any)=>{
        this.loadingHandler.finish();
        this.notifyService.showError("Mmh.. Something went wrong deleting user.", "TopUpMama")
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
