import { Component, OnInit } from "@angular/core";
import { UsersService } from "../services/users.service";
import { tap, delay } from "rxjs/operators";
import { Users } from "../models/users";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html"
})
export class UsersComponent implements OnInit {
  loading: boolean = false;
  allUser: Users[];
  errorMessage: string = null;
  message: string = null;
  msgType: string = null;

  constructor(private users: UsersService) {}

  getMessage(msg: object) {
    this.msgType = msg["type"];
    this.message = msg["Message"];
  }

  removeUser(id: number) {
    let deletedUser = this.allUser.filter(user => user.Id == id);
    this.allUser.splice(this.allUser.indexOf(deletedUser[0]), 1);
  }

  ngOnInit() {
    this.users
      .getAllUser()
      .pipe(
        tap(() => (this.loading = true)),
        delay(1000)
      )
      .subscribe(
        (val: Users[]) => {
          this.allUser = val;
          this.loading = false;
        },
        err => {
          this.message = err["Message"];
          this.msgType = "error";
          this.loading = false;
        },
        () => (this.loading = false)
      );
  }
}
