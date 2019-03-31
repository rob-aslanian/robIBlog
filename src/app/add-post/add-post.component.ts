import { Component, OnInit } from "@angular/core";
import { MessagesService } from "../services/messages.service";
import { Message } from "../models/messages";
import { tap, delay } from "rxjs/operators";

@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.component.html"
})
export class AddPostComponent implements OnInit {
  loading: boolean;
  serverMessages: object = null;

  constructor(private message: MessagesService) {}

  makeRequest(message: Message) {
    this.message
      .postMessage(message)
      .pipe(
        tap(() => (this.loading = true)),
        delay(1000)
      )
      .subscribe(
        val => {
          this.loading = false;
          this.serverMessages = {
            type: "success",
            message: val["Message"]
          };
        },
        err => {
          this.loading = false;
          this.serverMessages = {
            type: "error",
            message: err["Message"]
          };
          console.log(err);
        },
        () => (this.loading = false)
      );

    return false;
  }

  ngOnInit() {}
}
