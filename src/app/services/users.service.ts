import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Users } from "../models/users";
import { LsService } from "./ls.service";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private ls: LsService,
    @Inject("USERS_API") private api: string
  ) {}

  private _getUser(type: number | string) {
    const urlLink = typeof type == "number" ? type : "getbyname/" + type;
    const url = `${this.api}${urlLink} `;

    return this.http.get(url).pipe(
      map((user: Users) => {
        let data = user["data"];
        return new Users({
          Id: data.Id,
          name: data.name,
          Posts: data.Posts,
          token: user.token
        });
      }),
      catchError(err => throwError(err.error))
    );
  }
  private _requestOptions(): Object {
    let token = this.ls.item;

    const requestOptions = {
      headers: new HttpHeaders({
        "X-User": token
      })
    };

    if (token !== null) return requestOptions;

    return null;
  }
  /**
   * GET METHOD: api/users/id
   * @param id
   */
  getUserById(id: number): Observable<any> {
    return this._getUser(id);
  }

  /**
   * GET METHOD: api/users/name
   * @param name
   */
  getUserByName(name: string): Observable<any> {
    return this._getUser(name);
  }

  /**
   * GET MWTHOD: api/users
   */
  getAllUser(): Observable<Users[]> {
    return this.http.get(this.api).pipe(
      map((users: Array<any>) => {
        return users.map(user => {
          return new Users({
            Id: user.Id,
            name: user.name,
            Posts: user.Posts
          });
        });
      }),
      catchError(err => throwError(err.error))
    );
  }
  /**
   * POST METHOD
   * @param obj
   */
  postUser(obj: Users): Observable<Object> {
    return this.http
      .post(this.api, obj)
      .pipe(catchError(err => throwError(err.error)));
  }

  /**
   * PUT METHOD: api/users/1
   * @param id
   * @param body
   */
  updateUser(id: number, body: Users): Observable<Object> {
    let requestOptions = this._requestOptions();

    if (requestOptions == null)
      return throwError("You don`t have permission for it");

    return this.http
      .put(this.api + id, { ...body }, requestOptions)
      .pipe(catchError(err => throwError(err.error)));
  }

  /**
   * DELETE METHOD: api/users/1
   * @param id
   */
  deleteUser(id: number): Observable<object> {
    let requestOptions = this._requestOptions();

    if (requestOptions == null)
      return throwError("You don`t have permission for it");

    return this.http
      .delete(this.api + id, requestOptions)
      .pipe(catchError(err => throwError(err.error)));
  }
}
