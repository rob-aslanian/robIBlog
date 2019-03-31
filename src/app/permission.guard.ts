import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";

@Injectable({
  providedIn: "root"
})
export class PermissionGuard implements CanActivate {
  private _userId: number;
  private _paramId: number;

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    this._paramId = +next.params["id"];
    this._userId = this.auth.getUser()["Id"];

    if (isNaN(this._paramId) || this._userId !== this._paramId) {
      return this.router.navigate(["/home"]);
    }
    return this._userId === this._paramId;
  }
}
