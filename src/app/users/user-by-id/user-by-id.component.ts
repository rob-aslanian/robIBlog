import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users.service";
import { Users } from "src/app/models/users";
import { tap, delay } from "rxjs/operators";
import { ServerMessages } from "src/app/models/serverMessages";
import { AuthService } from "src/app/services/auth.service";
import { MessagesService } from "src/app/services/messages.service";

@Component({
  selector: "app-user-by-id",
  templateUrl: "./user-by-id.component.html"
})
export class UserByIdComponent implements OnInit {
  private _userId: number;

  postsCount: number = 0;
  newName: string = null;
  user: Users;
  loading: boolean = false;
  userForm: FormGroup;
  serverMessages: ServerMessages = null;

  constructor(
    f: FormBuilder,
    private route: ActivatedRoute,
    private users: UsersService,
    private auth: AuthService,
    private messages: MessagesService
  ) {
    this.route.params.subscribe(param => (this._userId = +param["id"]));
    this.userForm = f.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.maxLength(50)])
      ]
    });
  }

  validateForm(): boolean {
    return this.userForm.valid;
  }

  delteAllMessage() {
    this.messages
      .deleteAllMessage()
      .pipe(
        tap(() => (this.loading = true)),
        delay(1000)
      )
      .subscribe(
        (res: any) => {
          this.serverMessages = {
            type: "success",
            message: res["Message"]
          };
          this.postsCount = 0;
          this.loading = false;
        },
        (err: any) => {
          this.serverMessages = {
            type: "success",
            message: err["Message"]
          };
          this.loading = false;
        },
        () => (this.loading = false)
      );
  }

  submitForm() {
    if (this.validateForm() && this.user) {
      this.users
        .updateUser(this._userId, { name: this.newName })
        .pipe(
          tap(() => (this.loading = true)),
          delay(1000)
        )
        .subscribe(
          (res: any) => {
            this.auth.setUser(res.token);

            this.serverMessages = {
              type: "success",
              message: res["Message"]
            };
            this.loading = false;
          },
          (err: any) => {
            this.serverMessages = {
              type: "error",
              message: err["Message"]
            };
            this.loading = false;
          },
          () => (this.loading = false)
        );
    }
  }

  ngOnInit() {
    this.users
      .getUserById(this._userId)
      .pipe(
        tap(() => (this.loading = true)),
        delay(1000)
      )
      .subscribe(
        (res: any) => {
          this.postsCount = res.Posts.length;
          this.newName = res.name;

          this.user = res;
          this.loading = false;
        },
        (err: any) => {
          this.loading = false;
          this.serverMessages = {
            type: "error",
            message: err["Message"]
          };
        },
        () => (this.loading = false)
      );
  }
}
