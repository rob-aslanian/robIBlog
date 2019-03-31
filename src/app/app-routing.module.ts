import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./auth.guard";
import { PermissionGuard } from "./permission.guard";

import { LoginComponent } from "./login/login.component";
import { RobIBlogComponent } from "./rob-iblog/rob-iblog.component";
import { AddPostComponent } from "./add-post/add-post.component";
import { UsersComponent } from "./users/users.component";
import { UserByIdComponent } from "./users/user-by-id/user-by-id.component";
import { PostByIdComponent } from "./posts/post-by-id/post-by-id.component";
import { ChangePostComponent } from "./change-post/change-post.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: LoginComponent },
  { path: "home", component: RobIBlogComponent, canActivate: [AuthGuard] },
  { path: "addPost", component: AddPostComponent, canActivate: [AuthGuard] },
  { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: "user/:id",
    component: UserByIdComponent,
    canActivate: [AuthGuard, PermissionGuard]
  },
  { path: "post/:id", component: PostByIdComponent, canActivate: [AuthGuard] },
  {
    path: "changePost/:id",
    component: ChangePostComponent,
    canActivate: [AuthGuard]
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
