import { Injectable } from "@angular/core";
import { LsService } from "./ls.service";
import { UsersService } from "./users.service";
import { User, Users } from "../models/users";
import { Observable, of } from "rxjs";
import { map, tap, delay, debounceTime, combineLatest } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private router: Router,
    private ls: LsService,
    private user: UsersService
  ) {}

  removeUser(id: number) {
    return this.user.deleteUser(id).pipe(map(el => el));
  }

  /**
   * Register user , then login
   * @param body
   */
  registerUser(body: Users): Observable<object> {
    return this.user.postUser(body).pipe(
      map(newUser => newUser),
      tap(() => this.login(body.name).subscribe())
    );
  }

  /**
   * Login user and set token to ls
   * @param name
   */
  login(name: string): Observable<Users> {
    return this.user.getUserByName(name).pipe(
      map((val: Users) => {
        if (val.token !== null) {
          this.ls.item = val.token;
        }
        return val;
      }),
      delay(500),
      tap(() => this.router.navigate(["/home"]))
    );
  }
  /**
   * Get user id and name
   * @returns [User]
   */
  getUser(): User {
    if (this.isLogedIn()) {
      let decodeToken = atob(this.ls.item).split("_"),
        userId = decodeToken[0],
        userName = decodeToken[1];

      return {
        Id: +userId,
        name: userName
      };
    }

    return null;
  }

  setUser(token: string) {
    return (this.ls.item = token);
  }

  logOut(): boolean {
    if (this.isLogedIn()) {
      localStorage.removeItem("accessToken");
      this.router.navigate(["/login"]);
      return true;
    }

    return false;
  }

  /**
   * Check if user is loged in
   * @returns [boolean]
   */
  isLogedIn(): boolean {
    let token = this.ls.item;

    try {
      let deocodeToken = atob(token);

      if (deocodeToken != null && deocodeToken.includes("_")) return true;

      return false;
    } catch (ex) {
      throw ex;
    }
  }
}
