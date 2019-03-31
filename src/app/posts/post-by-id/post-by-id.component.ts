import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MessagesService } from "src/app/services/messages.service";
import { UsersService } from "src/app/services/users.service";
import { Message } from "src/app/models/messages";
import { ServerMessages } from "src/app/models/serverMessages";
import { delay, tap } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-post-by-id",
  templateUrl: "./post-by-id.component.html",
  styleUrls: ["./post-by-id.component.scss"]
})
export class PostByIdComponent implements OnInit {
  private _postId: number;
  private _currUserId: number;

  hasPermission: boolean = false;
  loading: boolean = true;
  userName: string;
  currMessage: Message;
  serverMessages: ServerMessages = null;
  deleting: boolean = false;

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private messages: MessagesService,
    private users: UsersService,
    private auth: AuthService
  ) {
    this.router.params.subscribe(param => (this._postId = +param["id"]));
  }

  deletePost() {
    this.messages
      .deleteMessage(this._postId)
      .pipe(
        tap(() => {
          this.deleting = true;
          this.loading = true;
        }),
        delay(1000)
      )
      .subscribe(
        (res: any) => {
          this.serverMessages = {
            type: "success",
            message: res["Message"]
          };
          this.loading = false;
          setTimeout(() => this.route.navigate(["/home"]), 1000);
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

  makeRequest(post_id: number) {
    console.log(this._postId);
    this.messages
      .getMessageById(post_id)
      .pipe(delay(500))
      .subscribe(
        (res: Message) => {
          this.users.getUserById(res.user_id).subscribe(user => {
            this.userName = user.name;
            this._currUserId = user.Id;

            if (user.Id === this.auth.getUser()["Id"])
              this.hasPermission = true;
          });

          this.currMessage = res;
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

  ngOnInit() {
    if (!isNaN(this._postId)) {
      return this.makeRequest(this._postId);
    }

    this.serverMessages = {
      type: "error",
      message: "Id can`t be typeof string"
    };
  }
}
