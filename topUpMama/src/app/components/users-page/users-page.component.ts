import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../_services/users/users.service";

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

  constructor(
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

        console.log(this.currentPage)
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


}
