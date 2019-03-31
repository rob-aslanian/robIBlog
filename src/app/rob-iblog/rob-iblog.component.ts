import { Component, OnInit } from "@angular/core";
import { Users } from "../models/users";
import { UsersService } from "../services/users.service";
import { tap, delay } from "rxjs/operators";

@Component({
  selector: "app-rob-iblog",
  templateUrl: "./rob-iblog.component.html"
})
export class RobIBlogComponent implements OnInit {
  loading: boolean = true;
  allUser: Users[];
  hasMessages: boolean = true;
  sererMessages: object = null;

  constructor(private users: UsersService) {}

  ngOnInit() {
    this.users
      .getAllUser()
      .pipe(
        tap(() => (this.loading = true)),
        delay(1000)
      )
      .subscribe(
        val => {
          this.hasMessages = val.some(user => user.Posts.length !== 0);
          if (!this.hasMessages) {
            this.sererMessages = {
              type: "info",
              message: "There is no posts"
            };
          }

          this.allUser = val.filter(usr => usr.Posts.length !== 0);

          this.loading = false;
        },
        err => {
          let _msg = null;
          !err.hasOwnProperty("Message")
            ? (_msg = "500 Internal Server Error")
            : (_msg = err["Message"]);

          this.sererMessages = {
            type: "error",
            message: _msg
          };

          this.loading = false;
        },
        () => (this.loading = false)
      );
  }
}
