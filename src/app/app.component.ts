import { Component, SimpleChanges } from "@angular/core";
import { UsersService } from "./services/users.service";
import { Observable } from "rxjs";
import { MessagesService } from "./services/messages.service";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "RobIBlog";

  constructor(
    private message: MessagesService,
    private auth: AuthService,
    private user: UsersService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log("yleeeeeeeee");
  }

  ngOnInit(): void {
    // this.auth.login("Robi");
  }
}
