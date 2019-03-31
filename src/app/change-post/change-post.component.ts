import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ServerMessages } from "../models/serverMessages";
import { MessagesService } from "../services/messages.service";
import { Message } from "../models/messages";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-change-post",
  templateUrl: "./change-post.component.html"
})
export class ChangePostComponent implements OnInit {
  private _postId: number;

  loading: boolean = false;
  currMessage: Message = null;
  serverMessages: ServerMessages = null;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private message: MessagesService
  ) {
    this.route.params.subscribe(param => (this._postId = +param["id"]));
  }

  getMessage() {
    this.message.getMessageById(this._postId).subscribe(
      (res: any) => {
        if (res.user_id !== this.auth.getUser()["Id"]) {
          this.router.navigate(["/home"]);
        }

        this.currMessage = res;
      },
      (err: any) => {
        this.serverMessages = {
          type: "error",
          message: err["Message"]
        };
      }
    );
  }

  makeRequest(message: Message) {
    this.message.updateMessage(this._postId, message).subscribe(
      (res: any) => {
        this.serverMessages = {
          type: "success",
          message: res["Message"]
        };
        this.loading = false;

        setTimeout(() => this.router.navigate([`/post/${this._postId}`]), 1000);
      },
      err => {
        this.serverMessages = {
          type: "error",
          message: err["Message"]
        };
        this.loading = false;
      },
      () => (this.loading = false)
    );
  }

  ngOnInit() {
    if (isNaN(this._postId)) {
      return (this.serverMessages = {
        type: "error",
        message: "Id can`t be typeof string"
      });
    }
    return this.getMessage();
  }
}
