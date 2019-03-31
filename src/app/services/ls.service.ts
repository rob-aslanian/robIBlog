import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LsService {
  lsItem: string;
  itemValue: Subject<string> = new Subject<string>();

  set item(value) {
    this.itemValue.next(value);
    localStorage.setItem("accessToken", value);
  }
  get item() {
    return localStorage.getItem("accessToken");
  }
}
