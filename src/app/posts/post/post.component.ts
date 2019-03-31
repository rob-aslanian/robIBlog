import { Component, OnInit, Input } from "@angular/core";
import { Messages } from "src/app/models/messages";
import { ActivatedRoute } from "@angular/router";
import { MessagesService } from "src/app/services/messages.service";
import { UsersService } from "src/app/services/users.service";
import { map, tap } from "rxjs/operators";
import { Users } from "src/app/models/users";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.scss"]
})
export class PostComponent implements OnInit {
  @Input() user: string;
  @Input() messages: Messages;
  @Input() getById: boolean = false;

  imagePath: string;

  constructor(private users: UsersService) {}

  ngOnInit() {
    if (this.messages && (this.messages as Messages)) {
      let userID: number = this.messages.user_id;
      this.users.getUserById(userID).subscribe(user => (this.user = user.name));
    }
  }
}
