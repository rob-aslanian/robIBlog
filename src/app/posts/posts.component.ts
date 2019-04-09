import { Component, Input, HostListener } from "@angular/core";
import { Users } from "../models/users";
import { Messages } from "../models/messages";
import { MessagesService } from "../services/messages.service";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"]
})
export class PostsComponent {
  @Input() users: Users[];
  selected: string = "*";
  checked: boolean = false;

  postCount: number = 2;
  filterdPosts: Messages[];
  posts: Messages[];
  postTitles: Array<string>;
  loadingData: boolean = false;

  constructor(private messages: MessagesService) {}

  ngOnInit(): void {
    this.getMessage();
  }

  getMessage() {
    this.messages.getAllMessage(this.postCount).subscribe((val: Messages[]) => {
      console.log(val);

      this.posts = val;
      this.filterdPosts = val;

      this.postTitles = val.map(post => post.title.toLowerCase());
    });
    if (this.posts) {
      this.filterdPosts = this.posts;
    }
  }

  @HostListener("window:scroll", ["$event"])
  loadDataOnScroll() {
    let scrollable = window.scrollY,
      maxHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (scrollable === maxHeight) {
      if (this.postCount <= this.posts.length) {
        this.postCount += 2;
        this.loadingData = true;
        this.getMessage();
      } else {
        this.loadingData = false;
      }
    }
  }

  search(items: Array<string>) {
    if (!items || items.length === 0) {
      return (this.filterdPosts = this.posts);
    }
    this.filterdPosts = this.posts.filter(
      post => items.indexOf(post.title.toLowerCase()) > -1
    );
  }

  sortByTime() {
    if (this.filterdPosts) {
      this.filterdPosts.sort((curr, next) =>
        new Date(curr.createdAt).getTime() <
          new Date(next.createdAt).getTime() && this.checked
          ? 1
          : -1
      );
    }
  }
  filterByUser(value: string) {
    if (value === "*") return (this.filterdPosts = this.posts);
    this.filterdPosts = this.posts.filter(post => post.user_id == +value);
  }
}
