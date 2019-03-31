import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Users } from "../models/users";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  load: boolean = false;
  serveMessage: string = null;
  messageType: string = null;
  searchResult: Users;
  routerType: string = "login";

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.router.url.includes("register")) this.routerType = "register";
  }

  getResult(result: Users) {
    // if (result && result !== null) {
    //   this.router.navigate(["/home"]);
    // }
  }

  getMessages(message: object) {
    let type = message["type"];
    switch (type) {
      case "error": {
        this.messageType = type;
        if (!message.hasOwnProperty("Message")) {
          this.serveMessage = "500: Internal server error";
        } else {
          this.serveMessage = message["Message"];
        }
        break;
      }
      case "success": {
        this.messageType = type;
        this.serveMessage = message["Message"];
        break;
      }
    }
  }
}
