import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../_services/users/users.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {
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

  //Create user form
  addUserForm = this.fb.group({
    name:['', [Validators.required]],
    job:['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private userService: UsersService) {
  }

  ngOnInit(): void {
    this.fetchAllUser(1, this.defaultPerPage)
  }

  fetchAllUser(page: number, page_size: number) {
    // List users
    this.userService.listUsers(page, page_size).subscribe({
      next: data => {
        this.allListedUsers = data.data
        this.currentPage = data.page
        this.totalPages = data.total_pages
        this.itemsListNumber = data.per_page
        this.pageNumbers = Array.from({length: this.totalPages}, (val, ind) => ind + 1)
      },
      error: err => {
        this.errorMessage = err.error.error
        // console.log(this.errorMessage)
      }
    })
  }


  getUserId() {

  }

  deleteUserId() {

  }

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

  // check form validity
  get name() {
    return this.addUserForm.get('name')
  }
  get job() {
    return this.addUserForm.get('job')
  }

  // Create user function
  addUserSubmit() {
    this.userService.createUser(this.addUserForm.value).subscribe({
      next: (data: any) => {
        console.log(data)
      },
      error: (err: { error: { error: string; }; }) => {
        // this.errorMessage = err.error.error
        console.log(err)
      }
    })

  }
}
