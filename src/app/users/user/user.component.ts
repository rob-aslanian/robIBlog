import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Users } from "src/app/models/users";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  @Input() user: Users;

  @Output() message: EventEmitter<object> = new EventEmitter<object>();
  @Output() removeUser: EventEmitter<number> = new EventEmitter<number>();

  currentUserID: number = null;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.currentUserID = this.auth.getUser()["Id"];
  }

  deleteUser(id: number) {
    this.auth.removeUser(id).subscribe(
      val => {
        let obj = { ...val, type: "success" };
        this.message.emit(obj);
        this.removeUser.emit(id);
        setTimeout(() => this.auth.logOut(), 2500);
      },
      err => {
        let obj = { ...err, type: "error" };
        this.message.emit(obj);
      }
    );

    return false;
  }
}
