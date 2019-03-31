import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Users } from "src/app/models/users";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html"
})
export class LoginFormComponent implements OnInit {
  @Input() routerType: string;

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() messages: EventEmitter<object> = new EventEmitter<object>();
  @Output() result: EventEmitter<Users> = new EventEmitter<Users>();

  hasError: boolean = false;
  loginForm: FormGroup;

  constructor(private auth: AuthService, f: FormBuilder) {
    this.loginForm = f.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)])
      ]
    });
  }

  makeRequst(name: string) {
    this.loading.emit(true);

    this.auth.login(name).subscribe(
      val => {
        this.result.emit(val);
      },
      err => {
        let obj = { ...err, type: "error" };
        this.messages.emit(obj);
        this.loading.emit(false);
      },
      () => this.loading.emit(false)
    );
  }

  retgisterUser(name: string) {
    this.loading.emit(true);

    this.auth.registerUser({ name }).subscribe(
      val => {
        let obj = { ...val, type: "success" };
        this.messages.emit(obj);
      },
      err => {
        let obj = { ...err, type: "error" };
        this.messages.emit(obj);
        this.loading.emit(false);
      },
      () => this.loading.emit(false)
    );
    // console.log(name);
  }

  validateForm(form: any): boolean {
    if (form["name"].invalid) {
      this.hasError = true;
      return false;
    }

    this.hasError = false;
    return true;
  }

  submitForm(form: any) {
    if (this.validateForm(form)) {
      let userName = form["name"].value;
      switch (this.routerType) {
        case "login":
          return this.makeRequst(userName);
        case "register":
          return this.retgisterUser(userName);
        default:
          return this.makeRequst(userName);
      }
    }
  }

  ngOnInit() {}
}
