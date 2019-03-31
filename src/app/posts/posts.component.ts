import { Component, Input } from "@angular/core";
import { Users } from "../models/users";
import { Messages } from "../models/messages";
import { MessagesService } from "../services/messages.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html"
})
export class PostsComponent {
  @Input() users: Users[];
  selected: string = "*";
  checked: boolean = false;

  filterdUsers: Messages[];
  posts: Messages[];
  postTitles: Array<string>;

  constructor(private messages: MessagesService) {}

  ngOnInit(): void {
    this.messages.getAllMessage().subscribe(val => {
      this.posts = val;
      this.filterdUsers = val;
      this.postTitles = val.map(post => post.title);
    });
    if (this.posts) {
      this.filterdUsers = this.posts;
    }
  }

  sortByTime() {
    if (this.filterdUsers) {
      this.filterdUsers.sort((curr, next) =>
        new Date(curr.createdAt).getTime() <
          new Date(next.createdAt).getTime() && this.checked
          ? 1
          : -1
      );
    }
  }
  filterByUser(value: string) {
    if (value === "*") return (this.filterdUsers = this.posts);
    this.filterdUsers = this.posts.filter(post => post.user_id == +value);
  }
}
