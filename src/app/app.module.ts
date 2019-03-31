import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule, DatePipe } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RobIBlogServices } from "./services/index.service";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AddPostComponent } from "./add-post/add-post.component";
import { PostsComponent } from "./posts/posts.component";
import { PostComponent } from "./posts/post/post.component";
import { RobIBlogComponent } from "./rob-iblog/rob-iblog.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { MessageLogComponent } from "./message-log/message-log.component";
import { LoginFormComponent } from "./login/login-form/login-form.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { PostByIdComponent } from "./posts/post-by-id/post-by-id.component";
import { Progress } from "./progress/progress.component";
import { PostFormComponent } from "./post-form/post-form.component";
import { ChangePostComponent } from "./change-post/change-post.component";
import { UserByIdComponent } from "./users/user-by-id/user-by-id.component";
import { ImageUploadComponent } from './post-form/image-upload/image-upload.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddPostComponent,
    PostsComponent,
    PostComponent,
    RobIBlogComponent,
    UsersComponent,
    UserComponent,
    MessageLogComponent,
    LoginFormComponent,
    NavbarComponent,
    PostByIdComponent,
    Progress,
    PostFormComponent,
    ChangePostComponent,
    UserByIdComponent,
    ImageUploadComponent,
    PageNotFoundComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [RobIBlogServices, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
