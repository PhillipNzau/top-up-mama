import { Component, OnInit } from '@angular/core';
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
  totalPages: number[] = [];
  lastPage: number[] = [];
  pageNumbers: number[] = [];
  itemsListNumber: number[] = [];

  constructor(
    private userService: UsersService) { }

  ngOnInit(): void {
    this.fetchAllUser()
  }

  fetchAllUser(){
    // List users
    this.userService.listUsers(1, 6).subscribe((users:any)=>{
      // console.log(JSON.parse(users))
      this.allListedUsers = users.data
      console.log(this.allListedUsers)
    })
  }



  getUserId() {

  }

  deleteUserId() {

  }
}
