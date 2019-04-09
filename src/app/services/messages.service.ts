import { Injectable, Inject } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { LsService } from "./ls.service";
import { Observable, throwError } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Messages, Message } from "../models/messages";
import { map, catchError, single, take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MessagesService {
  constructor(
    private ls: LsService,
    private http: HttpClient,
    @Inject("MESSAGES_API") private api: string
  ) {}

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
   * GET METHOD: api/messages
   */
  getAllMessage(to: number = 2): Observable<Messages[]> {
    let requestOptions = this._requestOptions();
    let from = to <= 2 ? 0 : to - 2;

    if (requestOptions == null) return throwError("You don`t have permission");

    return this.http.get(this.api, requestOptions).pipe(
      map((messages: Array<any>) => {
        return <any>messages.slice(0, to).map((message: Message) => {
          return new Messages({
            id: message.id,
            user_id: message.user_id,
            title: message.title,
            body: message.body,
            createdAt: message.createdAt,
            imageName: message.imageName
          });
        });
      }),
      catchError(err => throwError(err))
    );
  }

  /**
   * GET METHOD: api/messages/1
   * @param msg_id
   */
  getMessageById(msg_id: number): Observable<Message> {
    let requestOptions = this._requestOptions();

    if (requestOptions == null) return throwError("You don`t have permission");

    return this.http.get(this.api + msg_id).pipe(
      single((message: Message) => message.id === msg_id),
      catchError(err => throwError(err.error))
    );
  }

  /**
   * POST METHOD: api/messages
   * @param body @type
   */
  postMessage(body: Message): Observable<Object> {
    let requestOptions = this._requestOptions();

    if (requestOptions == null) return throwError("You don`t have permission");

    return this.http
      .post(this.api, { ...body }, requestOptions)
      .pipe(catchError(err => throwError(err)));
  }

  /**
   * PUT METHOD: api/messages/1
   * @param msg_id
   * @param body
   */
  updateMessage(msg_id: number, body: Message): Observable<Object> {
    let requestOptions = this._requestOptions();

    if (requestOptions == null) return throwError("You don`t have permission");

    return this.http
      .put(this.api + msg_id, { ...body }, requestOptions)
      .pipe(catchError(err => throwError(err.error)));
  }

  /**
   * DELETE METHOD: api/messages/1
   * @param msg_id
   */
  deleteMessage(msg_id: number): Observable<Object> {
    let requestOptions = this._requestOptions();

    if (requestOptions == null) return throwError("You don`t have permission");

    return this.http
      .delete(this.api + msg_id, requestOptions)
      .pipe(catchError(err => throwError(err.error)));
  }

  /**
   * DELETE METHOD: api/messages/deleteall
   */
  deleteAllMessage(): Observable<Object> {
    let requestOptions = this._requestOptions();

    if (requestOptions == null) return throwError("You don`t have permission");

    return this.http
      .delete(this.api + "deleteAll", requestOptions)
      .pipe(catchError(err => throwError(err.error)));
  }
}
